file_path = "C:\\Users\DP963UE\\OneDrive - EY\\Desktop\HSBC_RC_POC\\Docs\\Annex XXIV - LCR templates_for publication.xlsx"
import pandas as pd

def parse_excel(file_path):
    # Load sheets
    sheet_data = pd.read_excel(file_path, sheet_name=None, header=[0, 1])
    parsed_data = {}

    for sheet_name, df in sheet_data.items():
        print(f"Processing Sheet: {sheet_name}")
        
        # Clean data
        df.dropna(axis=1, how='all', inplace=True)
        df.dropna(axis=0, how='all', inplace=True)
        
        # Merge multi-row headers
        df.columns = ['_'.join([str(i) for i in col if str(i) != 'nan']).strip() 
                     for col in df.columns]
        
        # Print columns
        print(f"Columns in {sheet_name}: {df.columns.tolist()}")
        # Process data rows
        df = df.iloc[1:].reset_index(drop=True)
        
        # Filter valid Item IDs
        item_id_col = df.columns[0]
        df = df[df[item_id_col].notna()]
        df = df[~df[item_id_col].astype(str).str.contains('-')]
        
        # Store results
        parsed_data[sheet_name] = df.to_dict(orient='records')

    return parsed_data

if __name__ == "__main__":
    #file_path = "your_excel_file.xlsx"
    result = parse_excel(file_path)
    
    # Display results
    for sheet, records in result.items():
        print(f"\nSheet: {sheet}")
        print(f"Records found: {len(records)}")
        if records:
            print("Sample record:", records[1])