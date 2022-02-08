'###################################################################################################################
'Test Script Name: TC_05_CnC_Enquiry Extend order button is disabled
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:
'Designed Date(MM/DD/YY): 11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\Click And Collect\Automation\Test Data\Click and Collect.xls"
TestScriptName = "TC_05_CnC_Enquiry Extend order button is disabled"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
		strUsername = DataTable.Value("UserName")
		strPassword = DataTable.Value("Password")
		strParcelReference = Datatable.Value("ParcelReference")	
		LoginType = datatable.Value("Login")
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
Repositoriescollection.Add DirPath&"\Object Repository\XstoreRepository.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\CandC1.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Login.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Logout.tsr"
LoadFunctionLibrary DirPath&"\Function Library\Common Functions.qfl"

wait 2

If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	call LoginXstore(LoginType,strUsername,strPassword)
End If

'backoffice login
wait 2

JavaWindow("Oracle Retail Xstore Point").JavaList("DtvList").Select "#3"
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaList("DtvList").Select "#2"
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaList("Search Criteria").Select "All Orders"
wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaEdit("Input Search Criteria").Set strParcelReference
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm_2").Click
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaList("DtvList").Select "#0"
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
wait 2
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Extend Order").Exist(2) Then
	Reporter.ReportEvent micPass,"Verify Extend Order Button is disabled","Collect Order Button is disabled"
Else
	Reporter.ReportEvent micFail,"Verify Extend Order Button is disabled","Collect Order Button is enabled"
End If
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Click
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Click
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click

Call Logout(LoginType)

On Error Goto 0
ExitRun

