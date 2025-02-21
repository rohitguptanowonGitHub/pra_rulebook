import pandas as pd

# Path to your Excel file
excel_file_path = "C:\\Users\\DP963UE\\OneDrive - EY\\Desktop\\HSBC_RC_POC\\Docs\\solvency.xlsx"

# Read the Excel file
df = pd.read_excel(excel_file_path, sheet_name="7", usecols="C")

# Drop rows with blank values in column C
df = df.dropna()

# Convert column C to a list
column_c_list = df.iloc[:, 0].tolist()

print(column_c_list)