'###################################################################################################################
'Test Script Name: TC_07_CnC_To Verify Error Input Parcel Reference
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:
'Designed Date(MM/DD/YY): 12/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################

On Error Resume Next
    
DataFilePath = "C:\Click And Collect\Automation\Test Data\Click and Collect.xls"
TestScriptName = "TC_07_CnC_To Verify Error Input Parcel Reference"
	
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
		strTitle = Datatable.Value("Title")
		strFname = Datatable.Value("Fname")
		strLname = Datatable.Value("Lname")
		strPhNum = Datatable.Value("PhNum")
		strCourier = Datatable.Value("Courier")
		strRefMessage = Datatable.Value("RefMessage")
		LoginType = Datatable.Value("Login")	
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
LoadFunctionLibrary DirPath&"\Function Library\OrderCollectandList.qfl"


wait (2)
If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	wait 1
	call LoginXstore(LoginType,strUsername,strPassword)
End If

set objkeys = createobject("wscript.shell")

JavaWindow("Oracle Retail Xstore Point").JavaList("DtvList_2").Select "#3" @@ hightlight id_;_487095549_;_script infofile_;_ZIP::ssf8.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaList("DtvList_2").Select "#0" @@ hightlight id_;_487095549_;_script infofile_;_ZIP::ssf10.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click @@ hightlight id_;_319951907_;_script infofile_;_ZIP::ssf1.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Add").Click @@ hightlight id_;_1723124757_;_script infofile_;_ZIP::ssf11.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaList("Search Criteria").Select "Order/Fulfilment Number" @@ hightlight id_;_1909820139_;_script infofile_;_ZIP::ssf14.xml_;_
wait 2

JavaWindow("Oracle Retail Xstore Point").JavaEdit("PosTextField_3").Set strOrdNum

'JavaWindow("Oracle Retail Xstore Point").JavaEdit("Input Search Criteria").Set strOrdNum @@ hightlight id_;_1909820139_;_script infofile_;_ZIP::ssf15.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm_2").Click @@ hightlight id_;_149433257_;_script infofile_;_ZIP::ssf16.xml_;_
wait 5
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Add Manually").Exist(20) Then
JavaWindow("Oracle Retail Xstore Point").JavaButton("Add Manually").Click @@ hightlight id_;_1033824783_;_script infofile_;_ZIP::ssf17.xml_;_
End  If
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click @@ hightlight id_;_1384602485_;_script infofile_;_ZIP::ssf18.xml_;_
'wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click @@ hightlight id_;_1766639346_;_script infofile_;_ZIP::ssf19.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaList("Customer Name").Select strTitle @@ hightlight id_;_1881222846_;_script infofile_;_ZIP::ssf20.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaEdit("PosTextField").Set strFname @@ hightlight id_;_1605276186_;_script infofile_;_ZIP::ssf21.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaEdit("PosTextField_2").Set strLname @@ hightlight id_;_1438297893_;_script infofile_;_ZIP::ssf22.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaEdit("Contact Number").Set strPhNum @@ hightlight id_;_1209121404_;_script infofile_;_ZIP::ssf23.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaEdit("Order/Fulfilment Number").Set strOrdNum @@ hightlight id_;_1674020836_;_script infofile_;_ZIP::ssf28.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaList("Courier").Select strCourier @@ hightlight id_;_965479328_;_script infofile_;_ZIP::ssf29.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm_2").Click
wait 2
strMessage = JavaWindow("Oracle Retail Xstore Point").JavaEdit("PosTextPane").GetROProperty("text")
If instr(1,strRefMessage,strMessage,1)<>0 Then
	Reporter.ReportEvent micPass,"To Verify Error Input Parcel Reference","Error message is displayed"
Else
	Reporter.ReportEvent micFail,"To Verify Error Input Parcel Reference","Error message is not displayed"
End If
JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click @@ hightlight id_;_600623574_;_script infofile_;_ZIP::ssf33.xml_;_
'wait 2
'JavaWindow("Oracle Retail Xstore Point").JavaButton("No").Click @@ hightlight id_;_926278075_;_script infofile_;_ZIP::ssf34.xml_;_
wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Cancel").Click @@ hightlight id_;_1625034008_;_script infofile_;_ZIP::ssf35.xml_;_
wait 2
objkeys.SendKeys "{Esc}"


Call Logout(LoginType)

On Error Goto 0
ExitRun


