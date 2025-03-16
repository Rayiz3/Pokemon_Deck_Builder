import json
from collections import Counter


with open ("./public/2024_world_championship_result.json", "r") as f:
    records_data = json.load(f)["record"]
    
with open ("./public/entries.json", "r") as f:
    records_entries = json.load(f)

class KNNSolver():
    def __init__(self, data, records):
        self.data = data
        self.entries = records
        self.max_rank =len(records)
        self.score = 0.0
        self.near_entries = []
        
    def get_distance(self, entry1, entry2):
        '''
        entry1: str[]
        entry2: str[]
        return: int | distance between entry1 and entry2
        '''
        return sum([1 if pokemon in entry2 else 0 for pokemon in entry1])
    
    def get_statistics(self, my_entry, near_entires):
        '''
        my_entry: str[]
        near_entries: (int, str[], int)[]
        return: {str: {"tera": str[], "item": str[], "ability": str[], "moves": str[]}}
        '''
        if len(near_entries) == 0:
            return
        
        my_entry_stat = dict([(pokemon, {"tera": [],
                                         "item": [],
                                         "ability": [],
                                         "moves": []}) for pokemon in my_entry])
        
        for entry in near_entries:
            rank = entry[0]
            near_entry = self.data[rank-1]["team"]
            
            for refer_pokemon in near_entry:
                name = refer_pokemon["name"]
                if name in my_entry:
                    my_entry_stat[name]["tera"].append(refer_pokemon["terra_type"])
                    my_entry_stat[name]["item"].append(refer_pokemon["item"])
                    my_entry_stat[name]["ability"].append(refer_pokemon["ability"])
                    my_entry_stat[name]["moves"] += (refer_pokemon["skills"])
        
        return my_entry_stat
    
    def knn(self, entry, N=10):
        '''
        entry: str[]
        N: int
        return: (int, str[], int)[] | (rank, ranker entry, distance) by descending order
                int | average rank score
        '''
        entries_by_distance = []
        for rank in self.entries.keys():
            comparing_entry = self.entries[rank]
            entries_by_distance.append((int(rank), comparing_entry, self.get_distance(entry, comparing_entry)))
        
        self.near_entries = sorted(entries_by_distance, key=lambda x: x[2], reverse=True)[:N]
        
        self.score = self.max_rank - sum([entry[0] for entry in self.near_entries]) / N
        
        return self.near_entries, self.score
    
    def run(self, my_entry, N=10):
        self.knn(my_entry, N=N)
        my_entry_stat = self.get_statistics(my_entry, self.near_entries)
        
        def counter_parser(data, num_item=1):
            list_with_count = sorted(Counter(data).items(), key=lambda x: x[1], reverse=True)[:num_item]
            return [i[0] for i in list_with_count]
        
        print("+++ Recommanded settings +++")
        for name in my_entry_stat.keys():
            rec_tera = counter_parser(my_entry_stat[name]["tera"])[0]
            rec_item = counter_parser(my_entry_stat[name]["item"])[0]
            rec_ability = counter_parser(my_entry_stat[name]["ability"])[0]
            rec_moves = counter_parser(my_entry_stat[name]["moves"], num_item=4)
            
            print(f"[{name}]")
            print(f" tera type: {rec_tera} | item: {rec_item} | ability: {rec_ability}")
            print(f" moves: {rec_moves}\n")
        

recommander = KNNSolver(records_data, records_entries)

sample_entry = [
        "Miraidon",
        "Ogerpon_Hearthflame",
        "Urshifu_Rapid Strike Style",
        "Iron Hands",
        "Whimsicott",
        "Farigiraf"
    ]

near_entries, _ = recommander.knn(sample_entry, N=5)

#print(recommander.get_statistics(sample_entry, near_entries))
recommander.run(sample_entry)