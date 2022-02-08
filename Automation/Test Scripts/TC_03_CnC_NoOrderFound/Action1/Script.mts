'###################################################################################################################
'Test Script Name: TC_03_CnC_NoOrderFound
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:
'Designed Date(MM/DD/YY): 11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\Click And Collect\Automation\Test Data\Click and Collect.xls"
TestScriptName = "TC_03_CnC_NoOrderFound"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
		strUsername = DataTable.Value("UserName")
		strPassword = DataTable.Value("Password")
		strOrdNum = Datatable.Value("OrderNumber")
		strOrdstatus = Datatable.Value("OrderStatus")
		LoginType = DataTable.Value("Login")	
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
Repositoriescollection.Add DirPath&"\Object Repository\LoginToTill.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Logout.tsr"
LoadFunctionLibrary DirPath&"\Function Library\Common Functions.qfl"

wait 2

If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	wait 1
	call LoginXstore(LoginType,strUsername,strPassword)
End If

wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Additional Options").Click @@ hightlight id_;_885821604_;_script infofile_;_ZIP::ssf1.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Click & Collect").Click @@ hightlight id_;_1074713756_;_script infofile_;_ZIP::ssf2.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Collect").Click @@ hightlight id_;_2145764985_;_script infofile_;_ZIP::ssf109.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaList("Search Criteria").Select "Order Number" @@ hightlight id_;_2145764985_;_script infofile_;_ZIP::ssf110.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaEdit("Input Search Criteria").Set strOrdNum
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
wait 2
'strRefOrdstatus = JavaWindow("Oracle Retail Xstore Point").JavaEdit("PosTextField_3").GetROProperty("text")
If JavaWindow("Oracle Retail Xstore Point").JavaEdit("PosTextField_3").exist(1) then
	Reporter.ReportEvent micPass,"To verify No orders found","No orders found"
Else
	Reporter.ReportEvent micPass,"To verify No orders found","No orders found message did not come up"
End If

Call Logout(LoginType)

On Error Goto 0
ExitRun

