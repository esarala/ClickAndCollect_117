﻿'###################################################################################################################fi 0.5i^FI )
'Test Script Name: TC00_ETU_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\Click And Collect\Automation\Test Data\Click and Collect.xls"
TestScriptName = "TC020_CC_Enquiry_ClosedOrders"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
		strUsername = DataTable.Value("UserName")
		strPassword = DataTable.Value("Password")
		
		Exit For
	End If
Next
	
'Using for jenkins
strScriptLoc="Local"
TestScriptRootPath=Environment.Value("TestDir")
spath=Split(TestScriptRootPath,"\")
If strScriptLoc="Local" Then
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)
Else
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)&"\"&spath(3)&"\"&spath(4)&"\"&spath(5)&"\"&spath(6)&"\"&spath(7)&"\"&spath(8)&"\"&spath(9)&"\"&spath(10)
End If

'loading object repositories and library files
Repositoriescollection.Add DirPath&"\Object Repository\LocalRepo.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Repository1.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Logout.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\CandC.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\CnCTemp.tsr"
LoadFunctionLibrary DirPath&"\Function Library\Common Functions.qfl"
LoadFunctionLibrary DirPath&"\Function Library\ClickAndCollect.qfl"

wait (2)

If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	Call LoginToTill (strUsername, strPassword)
	wait 1
End If
	
	Call Enquiry_IncludeClosedOrders()


	Call Logout(LoginType)

On Error GoTo 0
ExitRun 

'
'Function Enquiry_IncludeClosedOrders()
'	
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Additional Options").Click
'wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Click & Collect").Click
'wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Enquiry").Click
'wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaList("Search Criteria").Select "All Orders"
'wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaCheckBox("icon-checkbox").Set "ON"
'wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
'wait 5
'
'if JavaWindow("Oracle Retail Xstore Point").JavaList("tagname:=DtvList").exist(1) then
'
'	reporter.ReportEvent micPass, "Till Enquiry All Orders list Include Closed Orders", "The All Orders list including closed orders in Enquiry is displayed as expected"
'	
'	else
'	reporter.ReportEvent micFail, "Till Enquiry All Orders list Include Closed Orders", "The All Orders list including closed orders in Enquiry is not displayed as expected, hence Failed!"
'	
'End If 
'
'wait 2
''JavaWindow("Oracle Retail Xstore Point").JavaButton("Cancel").Click
''Wait 2
'
'
'For i = 0 To 4
'		If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").exist(2) Then
'		JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
'		ElseIf JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").exist(2) Then
'		JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Click
'	End If
'	wait 3
'	Next
'	wait 3
'
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Log Off").Click
'
''JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Click
''wait 3
''JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
''wait 2
''JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Click
''wait 2
''JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Click
'''wait 2
''JavaWindow("Oracle Retail Xstore Point").JavaButton("Log Off").Click
'
'end Function
'
