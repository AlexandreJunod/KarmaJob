# KarmaJob

Datas are in JSON format.

## Users

```json
{
	"Users": {
		"id": 1,
		"first_name": "Toto",
		"last_name": "Otot",
		"password": "a25f0d23dcaf86ea78a24e7a39a7f5bb0cb1305e01a59e1f6d7e00ec31338cd8",
		"address": "Rue de la poste 12",
		"debt": {
			"karmapoints": 100,
			"worker": {
				"id": 3,
				"first_name": "Tom",
				"last_name": "Sawyer"
			}	
		},
		"credit": {
			"karmapoints": 300,
			"owner": {
				"id": 5,
				"first_name": "Tom",
				"last_name": "Jerry"
			}	
		}
	}
}
```

An user has a debt if he is owner of the job.
An user has a credit if he his the worker.

---

## Jobs

```json
{
	"job": {
		"id": 1,
		"title": "Tondre le gazon",
		"description": "Tondre ma pelouse de 300m carré",
		"theme": "Jardinage",
		"date": "30-10-2019",
		"duration": 2,
		"karmapoints": 100,
		"Owner": {
			"id": 1,
			"first_name": "Tom",
			"last_name": "Sawyer",
			"adresse": "Ste-croix"
		},
		"Worker": {
			"id": 2,
			"first_name": "Tom",
			"last_name": "Jerry",
			"adresse": "Rue de la poste 12"
        	},
		"status": {
			"id": 1,
			"name": "open"
		}
  	}
}
```

Duration is a float, it corresponds on the number of hours. 

---

## Seeder

To get easily a lot of datas, use [this](http://jsongen.pykaso.net/) json generator, next you can use [this](http://myjson.com) json hoster

It is used to try the application with more than 200 users and 500 jobs, I just replace the "apiurl" in DataProvider to use the json hoster

