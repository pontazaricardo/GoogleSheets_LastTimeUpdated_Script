# GoogleSheets_LastTimeUpdated_Script

This projects shows how to create a script that shows the last time a row was modified in a Google Sheets document.

## Usage

This project assumes that you have a Google Sheet document and this document uses the first row as a header row. Also assumes that in this header there is a "Last updated" column.

![example](/images/demo.gif?raw=true)

After any modification in any column (except in the header), the "Last updated" column in that row is updated. This also happens automatically for newly added rows.

## Installation 

In a new Google Sheet document, go to *Tools* -> *Script editor...*.

![install01](/images/pic04.png?raw=true)

In this window, copy the code inside the **Code.gs** file found in the **main** folder of this project.
