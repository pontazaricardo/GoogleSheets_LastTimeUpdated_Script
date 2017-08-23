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
