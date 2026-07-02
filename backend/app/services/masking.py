def mask_value(value):

    if len(value) <= 4:

        return "*" * len(value)

    return "*" * (len(value)-4) + value[-4:]

def mask_detections(detections):

    masked = {}

    for category, values in detections.items():

        masked[category] = [

            mask_value(v)

            for v in values

        ]

    return masked