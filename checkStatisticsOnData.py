import pandas as pd

# Load the CSV file
csv_path = r'C:\Users\USER\git\coffeeML\final_type_of_coffee.csv'
df = pd.read_csv(csv_path)

# Define the columns corresponding to coffee types
coffee_types = ['crema', 'presentation', 'type_of_cup', 'cappuccino', 'espresso', 'black', 'served_way']

# Group by these columns and count the occurrences
grouped_df = df.groupby(coffee_types).size().reset_index(name='count')

# Display the results
print(grouped_df)

# Initialize a dictionary to store the counts for each type
type_counts = {coffee_type: 0 for coffee_type in coffee_types}

# Iterate over the dataframe and count the instances of each type
for coffee_type in coffee_types:
    type_counts[coffee_type] = df[coffee_type].sum()

# Print the counts
for coffee_type, count in type_counts.items():
    print(f"{coffee_type}: {count}")

# Additional analysis: Percentage of each type
total_instances = len(df)
type_percentages = {coffee_type: (count / total_instances) * 100 for coffee_type, count in type_counts.items()}

# Print the percentages
for coffee_type, percentage in type_percentages.items():
    print(f"{coffee_type}: {percentage:.2f}%")