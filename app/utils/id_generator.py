import random
import string

def generate_item_id(report_type: str, category: str) -> str:
    """
    Generates a human-readable unique item ID
    Example: LOST-WALLET-A9F2
    """
    random_code = ''.join(
        random.choices(string.ascii_uppercase + string.digits, k=4)
    )

    return f"{report_type.upper()}-{category.upper()}-{random_code}"
