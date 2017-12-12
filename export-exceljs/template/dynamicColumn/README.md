# To test the dynamic column export, pass this below data to the /export/dynamicColumn api 
# This is a sample data

[
  { "name": "Disclaimer", "header": { "view": "Search Result" }, "data": [], "footer": {} },
  {
    "name": "Search Results",
    "header": { "view": "Research List" },
    "dataColumnHeader": {
      "Title": { "displayName": "Title", "type": "Uri" },
      "Category": { "displayName": "Category", "type": "string" },
      "ResearchDate": { "displayName": "Date", "type": "Date" },
      "Currency": { "displayName": "Currency", "type": "num", "numFormat": "$#,##0.00" },
      "Newtask": { "displayName": "Newtask", "type": "num", "numFormat": "$#,##0.000" }
    },
    "data": [
      {
        "Title": {
          "value": "Abc - VIASIA",
          "target": "https://app.Abcsolutions.com/0d921c84-7eee-4dbd-8667-3b18975ea4b5"
        },
        "Category": {
          "value": "MEMORA"
        },
        "ResearchDate": {
          "value": "12/11/1992, 7:07:06 AM"
        },
        "Currency": {
          "value": 8634343
        },
        "Newtask": {
          "value": 1834200
        }
      },
      {
        "Title": {
          "value": "Abc - VIASIA",
          "target": "https://app.Abcsolutions.com/0d921c84-7eee-4dbd-8667-3b18975ea4b5"
        },
        "Category": {
          "value": "MEMORA"
        },
        "ResearchDate": {
          "value": "12/11/1992, 7:07:06 AM"
        },
        "Currency": {
          "value": 18342
        },
        "Newtask": {
          "value": 1834200
        }
      },
      {
        "Title": {
          "value": "Abc - VIASIA",
          "target": "https://app.Abcsolutions.com/0d921c84-7eee-4dbd-8667-3b18975ea4b5"
        },
        "Category": {
          "value": "MEMORA"
        },
        "ResearchDate": {
          "value": "12/11/1992, 7:07:06 AM"
        },
        "Currency": {
          "value": 18342
        },
        "Newtask": {
          "value": 1834200
        }
      }
    ],
    "footer": {}
  }
]