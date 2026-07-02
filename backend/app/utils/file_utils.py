import os


def is_allowed_file(filename, allowed_extensions):

    extension = os.path.splitext(filename)[1].lower()

    return extension in allowed_extensions