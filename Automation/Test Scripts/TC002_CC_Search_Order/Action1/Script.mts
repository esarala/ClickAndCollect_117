'###################################################################################################################fi 0.5i^FI )
'Test Script Name: TC001_ETU_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\Click And Collect\Automation\Test Data\Click and Collect.xls"
TestScriptName = "TC002_CC_Search_Order"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
		strUsername = DataTable.Value("UserName")
		strPassword = DataTable.Value("Password")
		strFirstName = DataTable.Value("FirstName")
		strLastName = DataTable.Value("LastName")
		intMobileNum = DataTable.Value("Mobile Number")
		intParcelRef = DataTable.Value("ParcelNum")
		intOrderNum = DataTable.Value("OrderNum")
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
Repositoriescollection.Add DirPath&"\Object Repository\LocalRepo.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Repository1.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Logout.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\CandC.tsr"
LoadFunctionLibrary DirPath&"\Function Library\Common Functions.qfl"
LoadFunctionLibrary DirPath&"\Function Library\ClickAndCollect.qfl"

wait (2)

If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	Call LoginXstore(LoginType,strUsername,strPassword)
	wait 1
End If

Call Add_Search_Order (intOrderNum, strFirstName, strLastName, intMobileNum, intParcelRef)

Call Logout(LoginType)

On Error GoTo 0
ExitRun





