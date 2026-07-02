import { useState, useMemo } from 'react';
import { Table, ArrowUpDown, ArrowUp, ArrowDown, ShieldAlert, FileQuestion } from 'lucide-react';
import type { DetectedItem, SensitiveDataType, RiskLevel, SortDirection } from '../types';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import Pagination from './Pagination';

interface DetectionTableProps {
  items: DetectedItem[];
}

const typeLabels: Record<SensitiveDataType, string> = {
  email: 'Email Address',
  phone: 'Phone Number',
  pan: 'PAN Number',
  aadhaar: 'Aadhaar Number',
  credit_card: 'Credit Card',
  bank_details: 'Bank Details',
  password: 'Password',
  api_key: 'API Key',
  employee_id: 'Employee ID',
  confidential: 'Confidential',
};

const riskConfig: Record<RiskLevel, { label: string; color: string }> = {
  low: { label: 'Low', color: 'bg-success-100 text-success' },
  medium: { label: 'Medium', color: 'bg-warning-100 text-warning-600' },
  high: { label: 'High', color: 'bg-danger-100 text-danger' },
  critical: { label: 'Critical', color: 'bg-danger text-white' },
};

const statusConfig = {
  detected: { label: 'Detected', color: 'bg-primary-100 text-primary' },
  masked: { label: 'Masked', color: 'bg-success-100 text-success' },
  reviewing: { label: 'Reviewing', color: 'bg-warning-100 text-warning-600' },
};

const ITEMS_PER_PAGE = 10;

export default function DetectionTable({ items }: DetectionTableProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortKey, setSortKey] = useState<keyof DetectedItem>('type');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    let result = [...items];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (item) =>
          (item.originalValue && item.originalValue.toLowerCase().includes(searchLower)) ||
          (item.maskedValue && item.maskedValue.toLowerCase().includes(searchLower)) ||
          (item.type && typeLabels[item.type]?.toLowerCase().includes(searchLower))
      );
    }

    if (typeFilter) {
      result = result.filter((item) => item.type === typeFilter);
    }

    if (riskFilter) {
      result = result.filter((item) => item.risk === riskFilter);
    }

    if (statusFilter) {
      result = result.filter((item) => item.status === statusFilter);
    }

    result.sort((a, b) => {
      let comparison = 0;

      if (sortKey === 'type' || sortKey === 'risk' || sortKey === 'status') {
        comparison = String(a[sortKey] || '').localeCompare(String(b[sortKey] || ''));
      } else if (sortKey === 'confidence') {
        comparison = (a[sortKey] as number || 0) - (b[sortKey] as number || 0);
      } else {
        comparison = String(a[sortKey] || '').localeCompare(String(b[sortKey] || ''));
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [items, search, typeFilter, riskFilter, statusFilter, sortKey, sortDirection]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredItems.slice(start, end);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const handleSort = (key: keyof DetectedItem) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ column }: { column: keyof DetectedItem }) => {
    if (sortKey !== column) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-primary" />
    ) : (
      <ArrowDown className="w-4 h-4 text-primary" />
    );
  };

  const uniqueTypes = [...new Set(items?.map((item) => item.type).filter(Boolean))];
  const typeOptions = [
    { value: '', label: 'All Types' },
    ...uniqueTypes.map((value) => ({ value, label: typeLabels[value as SensitiveDataType] || value })),
  ];

  const uniqueRisks = [...new Set(items?.map((item) => item.risk).filter(Boolean))];
  const riskOptions = [
    { value: '', label: 'All Risks' },
    ...uniqueRisks.map((value) => ({ value, label: riskConfig[value as RiskLevel]?.label || value })),
  ];

  const uniqueStatuses = [...new Set(items?.map((item) => item.status).filter(Boolean))];
  const statusOptions = [
    { value: '', label: 'All Status' },
    ...uniqueStatuses.map((value) => ({ value, label: statusConfig[value as DetectedItem['status']]?.label || value })),
  ];

  const resetFilters = () => {
    setSearch('');
    setTypeFilter('');
    setRiskFilter('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  const hasItems = items && items.length > 0;

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Table className="w-5 h-5 text-heading" />
        <h2 className="text-lg font-semibold text-heading">Detection Results</h2>
        <span className="ml-auto text-sm text-body">
          {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
        </span>
      </div>

      {hasItems && (
        <>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search detected values..."
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {typeOptions.length > 1 && (
                <FilterDropdown
                  options={typeOptions}
                  value={typeFilter}
                  onChange={setTypeFilter}
                  placeholder="Type"
                />
              )}
              {riskOptions.length > 1 && (
                <FilterDropdown
                  options={riskOptions}
                  value={riskFilter}
                  onChange={setRiskFilter}
                  placeholder="Risk"
                />
              )}
              {statusOptions.length > 1 && (
                <FilterDropdown
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Status"
                />
              )}
              {(typeFilter || riskFilter || statusFilter || search) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary hover:text-primary-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {!hasItems ? (
        <div className="text-center py-12">
          <FileQuestion className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-body">No detection results available</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <ShieldAlert className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-body">No results match your filters</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {[
                    { key: 'type', label: 'Type' },
                    { key: 'originalValue', label: 'Detected Value' },
                    { key: 'maskedValue', label: 'Masked Value' },
                    { key: 'risk', label: 'Risk' },
                    { key: 'confidence', label: 'Confidence' },
                    { key: 'status', label: 'Status' },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key as keyof DetectedItem)}
                      className="px-4 py-3 text-left text-xs font-medium text-body uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {label}
                        <SortIcon column={key as keyof DetectedItem} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-heading">
                        {typeLabels[item.type] || item.type || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-heading font-mono">
                        {item.originalValue
                          ? item.originalValue.length > 30
                            ? `${item.originalValue.slice(0, 30)}...`
                            : item.originalValue
                          : 'N/A'}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-body font-mono">
                        {item.maskedValue || 'N/A'}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      {item.risk ? (
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            riskConfig[item.risk]?.color || 'bg-gray-100 text-body'
                          }`}
                        >
                          {riskConfig[item.risk]?.label || item.risk}
                        </span>
                      ) : (
                        <span className="text-xs text-body">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {item.confidence !== undefined && item.confidence !== null ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                item.confidence >= 90
                                  ? 'bg-success'
                                  : item.confidence >= 70
                                    ? 'bg-warning'
                                    : 'bg-danger'
                              }`}
                              style={{ width: `${item.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs text-body">{item.confidence}%</span>
                        </div>
                      ) : (
                        <span className="text-xs text-body">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {item.status ? (
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            statusConfig[item.status]?.color || 'bg-gray-100 text-body'
                          }`}
                        >
                          {statusConfig[item.status]?.label || item.status}
                        </span>
                      ) : (
                        <span className="text-xs text-body">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 pt-4 border-t border-border">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredItems.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
