import fitz
import pandas as pd
import os


def extract_document(file_path):

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":

        return extract_pdf(file_path)

    if extension == ".txt":

        return extract_txt(file_path)

    if extension == ".csv":

        return extract_csv(file_path)

    raise Exception("Unsupported document")

def extract_pdf(file_path):

    document = fitz.open(file_path)

    text = ""

    for page in document:

        text += page.get_text()

    return text, len(document)

def extract_txt(file_path):

    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as f:

        text = f.read()

    return text, 1

def extract_csv(file_path):

    df = pd.read_csv(file_path)

    text = df.to_string()

    return text, len(df)