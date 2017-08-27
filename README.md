# GoogleSheets_LastTimeUpdated_Script

This projects shows how to create a script that shows the last time a row was modified in a Google Sheets document.

## Usage

This project assumes that you have a Google Sheet document and this document uses the first row as a header row. Also assumes that in this header there is a "Last updated" column.

![example](/images/demo.gif?raw=true)

After any modification in any column (except in the header), the "Last updated" column in that row is updated. This also happens automatically for newly added rows.

## Installation 

In a new Google Sheet document, go to *Tools* -> *Script editor...*.

![install01](/images/pic04.png?raw=true)

In this window, copy the code inside the **Code.gs** file found in the **main** folder of this project. After copying it, verify that the line
```javascript
if(s.getName() == "Sheet1"){ //Modify this one and use your sheet name
```
contains the actual name of the sheet you are working on (in this case *Sheet1*). Then click on the **Run** button. This will display a series of authorization messages that you need to accept.

![install01](/images/app.gif?raw=true)

## Code

The function that we are modifying is the **onEdit(e)** function, which runs every time the cursor leaves a cell after performing a modification (no matter the key pressed to escape the cell, like *Enter*, the key pad or other).

```javascript
function onEdit(e){
  
  // Set a comment on the edited cell to indicate when it was changed.
  // NOTE: This code assumes that your first row consists of headers, and one of those headers is 'Last updated'
  
  var s = SpreadsheetApp.getActiveSheet(); // Get sheet name 
  
  if(s.getName() == "Sheet1"){ //Modify this one and use your sheet name
    
    //We need to determine the first nonempty row and nonempty column.
    var pivotCell = SpreadsheetApp.getActiveSheet().getRange(1,1);
    var lastUpdatedColumn = 0;
    
    //determine the "last updated" column
    while(!(pivotCell.getValue()==='')){
      
      if(pivotCell.getValue()=="Last updated"){
        lastUpdatedColumn = pivotCell.getColumn();
      }
      
      pivotCell = pivotCell.offset(0,1);
    }
    
    var r = s.getActiveCell(); //Gets the active cell
    
    if((lastUpdatedColumn>0) && (r.getRow() != 1)){ //We need this validation to be sure that a "Last updated" column exists, and we do not want to erase the "Last column" header if we update the first row.
        
        var time = new Date(); // Get date and time
        time = Utilities.formatDate(time, "PST8PDT", "MM/dd/yyyy, HH:mm:ss"); // We use PST8PDT (automatically updates in case of summer time).
        SpreadsheetApp.getActiveSheet().getRange(r.getRow(),lastUpdatedColumn).setValue(time); 
        
    }
  }
}
```

### Different header

If your header is not in the first row, just modify accordingly the following line:
```javascript
if((lastUpdatedColumn>0) && (r.getRow() != 1)){ //We need this validation to be sure that a "Last updated" column exists, and we do not want to erase the "Last column" header if we update the first row.
```

### Notes

For this code, the PST8PDT time zone is used. If you want to use a different time zone, click [here](http://www.timezoneconverter.com/cgi-bin/zoneinfo.tzc?s=default&tz=PST8PDT) to see the available options.
