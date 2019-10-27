Routes description
==================
questions/   
----------
type of request: GET
```
*** RETURNS ***
{
	"token": "string",
	"questions": [
		{
			"problemFields": [
				"svg or link",
				"svg or link",
				...
				"svg or link"
			],
			"options": [
				"svg or link",
				"svg or link",
				...
				"svg or link"
			]
		},
		...
	]
} 
```
answers/     
-------
type of request: POST   
> Condition: only one time per token
```
*** PARAMS ***
{
	"token": "string",
	"answers": [
		0,
		3,
		...
		1
	]
}
```
```
*** RETURNS ***
{
	"solutions": [
		0,
		2,
		...
		2
	],
	"pointsDistribution": [
		15,
		26,
		...
		17
	]
}
```
feedback/    
---------   
type of request: POST   
```
*** PARAMS ***
{
	"name": "string",
	"email": "string",
	"title": "string",
	"body": "string"
}
```
reports/
-------   
type of request: POST   
```
*** PARAMS ***
{
	"name": "string",
	"email": "string",
	"token": "string",
	"body": "string",
	"numberOfQuestion": 10
}
```
statistics/  
-----------   
type of request: GET 
```
*** RETURNS ***
{
	"passedTestsCounter": 152,
	"averageTime": 879,
	"pointsDistribution": [
		15,
		26,
		...
		17
	],
	"averageTimeDistribution": [
		12723,
		28641,
		...
		412783
	]
} 
```
