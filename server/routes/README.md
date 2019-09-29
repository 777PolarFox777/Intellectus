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
		  "problem": [
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
		... objects with the same structure ...
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
	"rightAnswers": [
		0,
		2,
		...
		2
	],
	"statistics": [
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
report/
-------   
type of request: POST   
```
*** PARAMS ***
{
	"name": "string",
	"email": "string",
	"token": "string",
	"body": "string",
	"numOfQuestion": 10
}
```
statistics/  
-----------   
type of request: GET 
```
*** RETURNS ***
{
	"statistics": [
		15,
		26,
		...
		17
	]
} 
```