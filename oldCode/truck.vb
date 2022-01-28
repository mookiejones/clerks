Imports System.Data
Imports System.Data.SqlClient
Imports System.Web

Imports System.Net.Mail
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _ 

<WebService(Namespace:="http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
<ScriptService()> _
Public Class truck
    Inherits System.Web.Services.WebService

    'Public _SQLRl As String = "Server=NORPLASSQL;Database=Racklabels;User Id=sa_pass;Password=apassword;"
    Public _SQLRl As String = "Server=NORPLASEXT2;Database=Racklabels;User Id=sa_pass;Password=apassword;"
    Public _IT3 As String = "Server=NORPLASSQL;Database=QAD_Repl;User Id=sa_pass;Password=apassword;"
    'Public _SQLWSUS As String = "Server=NORPLASSQL;Database=Components;User Id=sa_pass;Password=apassword;"
    Public _SQLWSUS As String = "Server=NORPLASEXT2;Database=TMS;User Id=sa_pass;Password=apassword;"

    <WebMethod()> _
    Public Function updateelement(ByVal elId As String, ByVal elVal As String) As String
        Dim strRet As String = ""
        'Dim objTemp As New genericcode

        If elId.Contains("disposition") Then
            genericSqlexec("update truck_window_detail set disposition = 9 where id = " & Replace(elId, "disposition", ""), _SQLWSUS)
            elVal = "Canceled"
        ElseIf elId.Contains("timeIN") Then
            elVal = Now.Hour.ToString.PadLeft("2", "0") & ":" & Now.Minute.ToString.PadLeft(2, "0")
            genericSqlexec("update truck_window_detail set timeIN = '" & Trim(elVal) & "' where id = " & Replace(elId, "timeIN", ""), _SQLWSUS)
        ElseIf elId.Contains("timeOUT") Then
            elVal = Now.Hour & ":" & Now.Minute
            genericSqlexec("update truck_window_detail set timeOUT = '" & Trim(elVal) & "' where id = " & Replace(elId, "timeOUT", ""), _SQLWSUS)
        ElseIf elId.Contains("trailer") Then
            genericSqlexec("update truck_window_detail set trailer = '" & Trim(elVal) & "' where id = " & Replace(elId, "trailer", ""), _SQLWSUS)
        ElseIf elId.Contains("shipper") Then
            genericSqlexec("update truck_window_detail set shipper = '" & Trim(elVal) & "' where id = " & Replace(elId, "shipper", ""), _SQLWSUS)
        ElseIf elId.Contains("fill") Then
            genericSqlexec("update truck_window_detail set fill = '" & Trim(elVal) & "' where id = " & Replace(elId, "fill", ""), _SQLWSUS)
        ElseIf elId.Contains("asn") Then
            genericSqlexec("update truck_window_detail set asn = '" & Trim(elVal) & "' where id = " & Replace(elId, "asn", ""), _SQLWSUS)
        ElseIf elId.Contains("scac") Then
            genericSqlexec("update truck_window_detail set scac = '" & Trim(elVal) & "' where id = " & Replace(elId, "scac", ""), _SQLWSUS)
        ElseIf elId.Contains("dock") Then
            genericSqlexec("update truck_window_detail set dockID = '" & Trim(elVal) & "' where id = " & Replace(elId, "dock", ""), _SQLWSUS)
        ElseIf elId.Contains("comment") Then
            genericSqlexec("update truck_window_detail set comment = '" & Trim(elVal) & "' where id = " & Replace(elId, "comment", ""), _SQLWSUS)
        ElseIf elId.Contains("xsiEdit") Then
            genericSqlexec("update special_instructions set instruction = '" & Trim(elVal) & "' where id = " & Replace(elId, "xsiEdit", ""), _SQLWSUS)
        End If

        Return elVal
    End Function

    Function getDataset(ByVal Sql As String, ByVal Cs As String) As DataSet
        Dim dsAm As New DataSet

        Dim conSQL As New SqlConnection
        Dim daAsnd As New SqlDataAdapter
        Dim intRows As Integer = 0

        conSQL.ConnectionString = Cs
        conSQL.Open()

        daAsnd.SelectCommand = New SqlCommand(Sql, conSQL)
        daAsnd.SelectCommand.CommandTimeout = 300
        daAsnd.Fill(dsAm)

        conSQL.Close()
        conSQL = Nothing

        Return dsAm
    End Function

    <WebMethod()> _
    Public Function closeSI(ByVal elId As String) As String
        Dim strRet As String = ""
        Dim objTemp As New genericcode
        strRet = genericSqlexec("update tms.dbo.special_instructions set closed = getdate() where id =" & Trim(elId), _SQLWSUS)
        objTemp = Nothing
        Return ""
    End Function

    <WebMethod()> _
    Public Function deleteTruckrow(ByVal elId As String) As String
        Dim strRet As String = ""
        Dim objTemp As New genericcode
        strRet = genericSqlexec("delete truck_window_detail where id =" & Trim(elId), _SQLWSUS)
        objTemp = Nothing
        Return "gotit"
    End Function

    <WebMethod()> _
    Public Function deletewindow(ByVal elId As String) As String
        elId = elId.Replace("btnD", "")
        Dim strRet As String = ""
        Dim objTemp As New genericcode
        strRet = genericSqlexec("delete truck_window_defaults where id =" & Trim(elId), _SQLWSUS)
        objTemp = Nothing
        Return "gotit"
    End Function

    <WebMethod()> _
    Public Function dategrid(ByVal Datein As Date, ByVal Who As String) As String
        '    "viewpage"   is a special "who" parameter value - this is a public, non-updating page
        Dim strAsk As String = Now.ToLongTimeString
        Dim strRet As String = ""
        Dim strSql As String = ""
        Dim strSuff As String = ""

        If Datein.ToString.Length = 0 Then
            Return "<table style='background-color:aqua;'><tr class='dg1h2'><td>Session data lost.  Please login.</td></tr></TABLE>"
        End If

        'BEGIN check to see if there are any detail rows setup for the selected date.  if so, skip this step.  If not Insert all default rows
        If Not LCase(Who) = "viewpage" Then
            strSql = " Select defs.* From  " & _
                          "      (select sendto_id, day, hour, minute from truck_window_defaults wd where wd.day = datepart(weekday, '" & Datein & "') ) as defs " & _
                          "   full join " & _
                          "      (select order_sendto_id, datepart(weekday, '" & Datein & "') as day, hour, minute from truck_window_detail wd where fordate = '" & Datein & "') as data  " & _
                          "   on defs.sendto_id = data.order_sendto_id and defs.day = data.day and defs.hour = data.hour and defs.minute = data.minute " & _
                          " Where data.order_sendto_id is null; " & _
                          "select order_sendto_id, datepart(weekday, '5/28/2012') as day, hour, minute  from truck_window_detail wd where fordate = '" & Datein & "'; "

            Dim dsNulls As New DataSet
            'Dim objGen As New genericcode
            dsNulls = getDataset(strSql, _SQLWSUS)

            Dim y As Integer = 0

            If dsNulls.Tables(1).Rows.Count = 0 Then 'if there are no detail rows, setup new detail rows based on the defaults for that day of week

                Dim deleteResult = genericSqlexec(String.Format("DELETE FROM [TMS].[dbo].[truck_window_detail] WHERE FORDATE < '{0}'", DateTime.Today.AddYears(-1).ToString("yyyy-MM-dd")), _SQLWSUS)


                For x As Integer = 0 To dsNulls.Tables(0).Rows.Count - 1
                    '            Dim objIn As New genericcode
                    With dsNulls.Tables(0).Rows(x)
                        y = genericSqlexec("INSERT truck_window_detail (fordate, hour, minute, order_sendto_id) VALUES " &
                                             " ('" & Datein & "', " & .Item("hour") & ", " & .Item("minute") & ", " & .Item("sendto_id") & ")", _SQLWSUS)
                    End With
                Next
            End If
            'objGen = Nothing
        End If
        ''END  check to see if there are any detail rows setup for the selected date.  if so, skip this step.  If not Insert all default rows

        ''BEGIN get all the detail rows for this date
        strSql = "select isnull(comment,'') as comment, isnull(dockID,'') as dockID, isnull(def.routeID,'') as routeID, isnull(def.scac,'') as scac, isnull(def.asn,'') as asn, isnull(def.carrier,'') as carrier, wd.id, o.name, order_sendto_id,  fordate, wd.hour, wd.minute, isnull(disposition,0) as disposition, isnull(fill,0) as fill, isnull(timeIN,'') as timeIN, isnull(timeOUT,'') as timeOUT, isnull(trailer,'') as trailer, isnull(shipper,'') as shipper, isnull(cutoff,'') as cutoff from truck_window_detail wd 	left join truck_window_defaults def on wd.order_sendto_id = def.sendto_id and def.hour = wd.hour and def.minute = wd.minute and def.day = datepart(weekday, wd.fordate) left join order_sendto o on o.id = wd.order_sendto_id where fordate = '" & Datein & "' order by o.name, wd.hour, wd.minute;" & _
                      "select distinct(order_sendto_id) as order_sendto_id, name from truck_window_detail d left join order_sendto o on o.id = d.order_sendto_id where fordate = '" & Datein & "' order by name; select disposition, description from truck_window_dispositions; "


        Dim dsDet As New DataSet
        Dim objDet As New genericcode
        dsDet = objDet.getDataset(strSql, _SQLWSUS)
        objDet = Nothing
        'END get all the detail rows for this date

        Dim strCol As String

        For z1 As Integer = 0 To dsDet.Tables(1).Rows.Count - 1
            If z1 Mod 2 = 0 Then
                strCol = "#BFBFBF"
            Else
                strCol = "#A4D3EE"
            End If

            Dim drRow As DataRow()
            drRow = dsDet.Tables(0).Select("order_sendto_id = " & dsDet.Tables(1).Rows(z1).Item(0))

            'BEGIN Special instructions section
            Dim strTb As String = ""
            strSuff = ""
            strSql = "select * from tms.dbo.special_instructions where order_sendto_id  = " & dsDet.Tables(1).Rows(z1).Item(0) & " and closed is null; "
            Dim dsSi As New DataSet
            Dim objSi As New genericcode
            dsSi = objSi.getDataset(strSql, objSi._SQLRlx)
            objSi = Nothing

            If dsSi.Tables(0).Rows.Count > 0 Then
                For x As Integer = 0 To dsSi.Tables(0).Rows.Count - 1
                    'strSuff &= "<tr style='background-color:yellow'><td colspan=14><input class='bodyText' type='button' id='si" & dsSi.Tables(0).Rows(x).Item("id") & "' value='Finish' onclick=finishSI(" & dsSi.Tables(0).Rows(x).Item("id") & ") </input>" & _
                    '     "&nbsp;&nbsp; " & dsSi.Tables(0).Rows(x).Item("instruction") & "</td></tr>"
                    strTb = getTextbox("", "100%", dsSi.Tables(0).Rows(x).Item("instruction"), "xsiEdit" & dsSi.Tables(0).Rows(x).Item("id"))
                    strSuff &= "<tr style='background-color:yellow'><td colspan=14><input class='bodyText' type='button' id='si" & dsSi.Tables(0).Rows(x).Item("id") & "' value='Finish' onclick=finishSI(" & dsSi.Tables(0).Rows(x).Item("id") & ") </input>" & _
                         "&nbsp;&nbsp; " & strTb & "</td></tr>"

                Next
            End If
            ' END Special instructions section

            Dim z As Integer = 0
            Dim strClass As String = "bodyText"
            Dim strId As String = ""
            Dim intDisp As Integer = 0
            'Dim strDisp As String = ""

            strId = "tblOut_" & dsDet.Tables(1).Rows(z1).Item(0)

            strRet &= "<table id='tbl" & drRow(0).Item("order_sendto_id") & "' style='border: solid 1px Silver; width: 100%;background-color:" & strCol & "; '> "
            strRet &= "<tr style='font-size:16px;'  id='tr" & drRow(0).Item("id") & "'><td colspan=8><B><u><a id='" & drRow(0).Item("name") & "'>" & drRow(0).Item("name") & "</a></B></u></td></tr>"
            strRet &= " <tr class= '" & strClass & "'>"
            If UCase(Who) = "Y" Then
                strRet &= "<td></td>"
            End If
            strRet &= "<td>Hour/Minute</td>"
            strRet &= "<td>ASN</td>"
            strRet &= "<td>Carrier</td>"
            strRet &= "<td>SCAC</td>"
            strRet &= "<td>Route ID</td>"
            strRet &= "<td>Disposition</td>"
            strRet &= "<td>In</td>"
            strRet &= "<td>Out</td>"
            strRet &= "<td>Trailer</td>"
            strRet &= "<td>Shipper</td>"
            strRet &= "<td>Fill %</td>"
            strRet &= "<td>Dock ID</td>"
            strRet &= "<td>Comment</td>"
            strRet &= "<td>Day 2 Cutoff</td>"
            strRet &= "</tr>"

            Dim strAsn As String

            For x As Integer = 0 To drRow.Length - 1
                intDisp = 0
                Try
                    intDisp = drRow(x).Item("disposition")
                Catch ex As Exception

                End Try

                Dim tmTemp As Date = Now.Date
                Dim strOptstyle As String = ""
                With drRow(x)
                    tmTemp = .Item("fordate")
                    tmTemp = DateAdd(DateInterval.Hour, CDbl(.Item("hour")), tmTemp)
                    tmTemp = DateAdd(DateInterval.Hour, CDbl(.Item("minute")), tmTemp)

                    If Now() > tmTemp And .Item("disposition") < 1 Then  ' Item is late being dispositioned
                        strOptstyle = "style='background-color:red;'"
                    End If

                    strRet &= "<tr " & strOptstyle & " class= '" & strClass & "' id='tr1" & drRow(x).Item("id") & "'>"
                    If UCase(Who) = "Y" Then
                        strRet &= "<td><input class='bodyText' type='button' id='del" & drRow(x).Item("id") & "' value='Delete' onclick=deleteRow(" & drRow(x).Item("id") & ") </input>&nbsp;</td><td>" & .Item("hour") & ":" & .Item("minute") & "</td> "
                    Else
                        strRet &= "<td>" & .Item("hour") & ":" & .Item("minute") & "</td> "
                    End If

                    If .Item("asn") = "1" Then
                        strAsn = "Yes"
                    Else
                        strAsn = "No"
                    End If

                    strRet &= "<td>" & strAsn & "</td>"
                    strRet &= "<td>" & .Item("carrier") & "</td>"
                    strRet &= "<td>" & .Item("scac") & "</td>"
                    strRet &= "<td>" & .Item("routeID") & "</td>"

                    If .Item("disposition") = 0 And Not LCase(Who) = "viewpage" Then
                        strRet &= "<td id='TDdisposition" & drRow(x).Item("id") & "'>" & getButton2(x, 10, .Item("disposition"), "disposition" & drRow(x).Item("id")) & "</td>"
                    Else
                        If Not LCase(Who) = "viewpage" Then
                            strRet &= "<td id='TDdisposition" & drRow(x).Item("id") & "' style='background-color:Green' >Canceled</td>"
                        Else
                            Dim strDisp As String = ""
                            If intDisp = 0 Then
                                strDisp = "Open"
                            Else
                                strDisp = "Canceled"
                            End If
                            strRet &= "<td id='TDdisposition" & drRow(x).Item("id") & "'>" & strDisp & "</td>"
                        End If
                    End If

                    Dim strCutoff As String = ""
                    strCutoff = Trim(.Item("cutoff"))
                    If strCutoff = "" Or strCutoff = "0" Then
                        strCutoff = "<td></td>"
                    Else
                        strCutoff = "<td bgcolor='yellow'>&nbsp;</td>"
                    End If

                    If Not LCase(Who) = "viewpage" Then
                        strRet &= "<td id='TDtimeIN" & drRow(x).Item("id") & "'>" & getButton(x, 10, .Item("timeIN"), "timeIN" & drRow(x).Item("id")) & "</td>"
                        strRet &= "<td id='TDtimeOUT" & drRow(x).Item("id") & "'>" & getButton(x, 10, .Item("timeOUT"), "timeOUT" & drRow(x).Item("id")) & "</td>"
                        strRet &= "<td>" & getTextbox(x, 8, .Item("trailer"), "trailer" & drRow(x).Item("id")) & "</td>"
                        strRet &= "<td>" & getTextbox(x, 12, .Item("shipper"), "shipper" & drRow(x).Item("id")) & "</td>"
                        strRet &= "<td>" & getTextbox(x, 6, .Item("fill"), "fill" & drRow(x).Item("id")) & "</td>"
                        strRet &= "<td>" & getTextbox(x, 12, .Item("dockID"), "dock" & drRow(x).Item("id")) & "</td>"
                        strRet &= "<td align=left>" & getTextbox(x, 25, .Item("comment"), "comment" & drRow(x).Item("id")) & "</td>"
                    Else
                        strRet &= "<td id='TDtimeIN" & drRow(x).Item("id") & "'>" & .Item("timeIN") & "</td>"
                        strRet &= "<td id='TDtimeOUT" & drRow(x).Item("id") & "'>" & .Item("timeOUT") & "</td>"
                        strRet &= "<td>" & .Item("trailer") & "</td>"
                        strRet &= "<td>" & .Item("shipper") & "</td>"
                        strRet &= "<td>" & .Item("fill") & "</td>"
                        strRet &= "<td>" & .Item("dockID") & "</td>"
                        strRet &= "<td align=left>" & .Item("comment") & "</td>"
                    End If

                    strRet &= strCutoff

                    strRet &= "</tr>"
                End With
            Next

            strRet &= strSuff
            strRet &= "</TABLE>"
        Next


        Dim strAnchors As String = "<DIV>"

        For x2 As Integer = 0 To dsDet.Tables(1).Rows.Count - 1
            strAnchors &= "<a href=""#" & dsDet.Tables(1).Rows(x2).Item("name") & """>" & dsDet.Tables(1).Rows(x2).Item("name") & "</a>&nbsp;&nbsp;"
        Next
        strAnchors &= "</DIV><br />"
        strRet = strAnchors & strRet

        Return "Data for " & Datein & " requested: " & strAsk & "; generated:" & Now.ToLongTimeString & " <BR><BR> " & strRet
    End Function

    Public Function genericSqlexec(ByVal Sql As String, ByVal CS As String) As Integer
        Dim intRet As Integer = 0
        Dim conSQL As New SqlConnection
        Dim cmdSQL As New SqlCommand

        If CS.Length > 0 Then
            conSQL.ConnectionString = CS
        Else
            conSQL.ConnectionString = "Server=NORPLASSQL;Database=SmallProjects;User Id=sa_pass;Password=apassword;"
        End If

        conSQL.Open()

        Try
            cmdSQL.Connection = conSQL
            cmdSQL.CommandText = Sql
            intRet = cmdSQL.ExecuteNonQuery()
        Catch ex As SQLException

           	sendEmail(System.Reflection.MethodBase.GetCurrentMethod().Name & " Error", ex.ToString() & " SQL: " & Sql, System.Reflection.MethodBase.GetCurrentMethod().Name)

        End Try

        conSQL.Close()
        conSQL = Nothing

        Return intRet
    End Function


 Public Sub sendEmail(ByRef strSubject As String, ByRef strMessage As String, ByRef strFunction As String)

        Dim smtpClient As SmtpClient
        Dim mailMessage As MailMessage
        Dim strFrom As MailAddress
        Dim strTo As MailAddress
		
        Try

            ' Instantiate the objects.
            smtpClient = New SmtpClient

            ' Initialize the variables.
            smtpClient.Host = "smtp.magna.global"
            smtpClient.Port = 25

            ' Setup the message.
            strTo = New MailAddress("matt.berkey@magna.com")
            strFrom = New MailAddress("matt.berkey@magna.com")
            mailMessage = New MailMessage(strFrom, strTo)
            mailMessage.Subject = strSubject
            mailMessage.Body = strMessage & vbCrLf & vbCrLf & "F(x): " & strFunction & vbCrLf & vbCrLf & System.Reflection.Assembly.GetExecutingAssembly.GetName.Name
            smtpClient.Send(mailMessage)


            ' Cleanup before leaving.
            smtpClient = Nothing

        Catch ex As Exception
        End Try
    End Sub


    Public Function makeDDl(ByVal itemname As String, ByVal Items As DataTable, ByVal curvalue As String, ByVal Display As String) As String
        Dim strRet As String = "<select id='" & itemname & "'> "

        For x As Integer = 0 To Items.Rows.Count - 1
            strRet &= "<option value='" & Items.Rows(x).Item(0) & "' "
            If LCase(Items.Rows(x).Item(0)) = LCase(curvalue) Then
                strRet &= " SELECTED"
            End If
            If Display.Length > 0 Then
                strRet &= ">" & Items.Rows(x).Item(1) & "</option> "
            Else
                strRet &= ">" & Items.Rows(x).Item(0) & "</option> "
            End If
        Next
        strRet &= " </select>"

        If itemname.Contains("ddlStatus") Then
            strRet &= "<div id =""div" & itemname & """></div>"
        End If

        Return strRet
    End Function

    Public Function getDelButton(ByVal Row As String, ByVal length As String, ByVal theval As String, ByVal thename As String) As String
        Dim strRet As String = ""

        strRet = "<input id='" & thename & "' class='bodyText' type='button' value = 'Delete' size ='" & length & "' />"

        Return strRet
    End Function

    Public Function getButton(ByVal Row As String, ByVal length As String, ByVal theval As String, ByVal thename As String) As String
        Dim strRet As String = ""
        If Trim(theval).Length = 0 Then
            theval = "Record"
            strRet = "<input id='" & thename & "' class='bodyText btnPb' type='button' value = '" & theval & "' size ='" & length & "' />"
        Else
            strRet = theval
        End If

        Return strRet
    End Function

    Public Function getButton2(ByVal Row As String, ByVal length As String, ByVal theval As String, ByVal thename As String) As String
        Dim strRet As String = ""
        If theval = 0 Then
            theval = "Cancel"
            'strRet = "<input id='" & thename & "' class='bodyText' type='button' value = '" & theval & "' size ='" & length & "' />"
            strRet = "<input id='" & thename & "' class='bodyText btnPb' type='button'  value = 'Cancel' size ='" & length & "'/>"
        Else
            strRet = "Canceled"
        End If

        Return strRet
    End Function

    Public Function getTextbox(ByVal Row As String, ByVal length As String, ByVal theval As String, ByVal thename As String) As String
        Dim strRet As String = ""
        If thename.Contains("comment") And theval.Length > 0 Then
            strRet = "<input id='" & thename & "' class='headerTitle' type='text' value = '" & theval & "' size ='" & length & "' />"
        Else
            strRet = "<input id='" & thename & "' class='bodyTextL' type='text' value = '" & theval & "' size ='" & length & "' />"
        End If
        Return strRet
    End Function


    <WebMethod()>
    Public Function twdefaults(ByVal Carryto As String) As String
        Dim strRet As String = ""
        Dim strSql As String = ""

        If Carryto.ToString.Length = 0 Then
            Return "<table style='background-color:aqua;'><tr class='dg1h2'><td>Session data lost.  Please login.</td></tr></TABLE>"
        End If

        'BEGIN get all the detail rows for this date
        strSql = "SELECT  s.name, d.id, day, hour, minute, CAST(hour AS varchar(2)) + ':' + case len(minute) when 1 then cast(minute as char(1))  +  '0' else cast(minute as char(2)) end AS longtime, routeID, carrier, trailertype, isnull(asn,'') as asn, isnull(scac,'') as scac, isnull(cutoff,'') as cutoff   FROM TMS.dbo.truck_window_defaults d left join dbo.order_sendto s on d.sendto_id = s.id where d.sendto_id = " & Carryto & " and d.day = 1 order by d.day, d.hour;" &
                        "SELECT s.name, d.id, day, hour, minute, CAST(hour AS varchar(2)) + ':' + case len(minute) when 1 then cast(minute as char(1))  +  '0' else cast(minute as char(2)) end AS longtime, routeID, carrier, trailertype, isnull(asn,'') as asn, isnull(scac,'') as scac, isnull(cutoff,'') as cutoff   FROM TMS.dbo.truck_window_defaults d left join dbo.order_sendto s on d.sendto_id = s.id where d.sendto_id = " & Carryto & " and d.day = 2 order by d.day, d.hour;" &
                        "SELECT s.name, d.id, day, hour, minute, CAST(hour AS varchar(2)) + ':' + case len(minute) when 1 then cast(minute as char(1))  +  '0' else cast(minute as char(2)) end AS longtime, routeID, carrier, trailertype, isnull(asn,'') as asn, isnull(scac,'') as scac, isnull(cutoff,'') as cutoff   FROM TMS.dbo.truck_window_defaults d left join dbo.order_sendto s on d.sendto_id = s.id where d.sendto_id = " & Carryto & " and d.day = 3 order by d.day, d.hour;" &
                        "SELECT s.name, d.id, day, hour, minute, CAST(hour AS varchar(2)) + ':' + case len(minute) when 1 then cast(minute as char(1))  +  '0' else cast(minute as char(2)) end AS longtime, routeID, carrier, trailertype, isnull(asn,'') as asn, isnull(scac,'') as scac, isnull(cutoff,'') as cutoff   FROM TMS.dbo.truck_window_defaults d left join dbo.order_sendto s on d.sendto_id = s.id where d.sendto_id = " & Carryto & " and d.day = 4 order by d.day, d.hour;" &
                        "SELECT s.name, d.id, day, hour, minute, CAST(hour AS varchar(2)) + ':' + case len(minute) when 1 then cast(minute as char(1))  +  '0' else cast(minute as char(2)) end AS longtime, routeID, carrier, trailertype, isnull(asn,'') as asn, isnull(scac,'') as scac, isnull(cutoff,'') as cutoff   FROM TMS.dbo.truck_window_defaults d left join dbo.order_sendto s on d.sendto_id = s.id where d.sendto_id = " & Carryto & " and d.day = 5 order by d.day, d.hour;" &
                        "SELECT s.name, d.id, day, hour, minute, CAST(hour AS varchar(2)) + ':' + case len(minute) when 1 then cast(minute as char(1))  +  '0' else cast(minute as char(2)) end AS longtime, routeID, carrier, trailertype, isnull(asn,'') as asn, isnull(scac,'') as scac, isnull(cutoff,'') as cutoff   FROM TMS.dbo.truck_window_defaults d left join dbo.order_sendto s on d.sendto_id = s.id where d.sendto_id = " & Carryto & " and d.day = 6 order by d.day, d.hour;" &
                        "SELECT s.name, d.id, day, hour, minute, CAST(hour AS varchar(2)) + ':' + case len(minute) when 1 then cast(minute as char(1))  +  '0' else cast(minute as char(2)) end AS longtime, routeID, carrier, trailertype, isnull(asn,'') as asn, isnull(scac,'') as scac, isnull(cutoff,'') as cutoff  FROM TMS.dbo.truck_window_defaults d left join dbo.order_sendto s on d.sendto_id = s.id where d.sendto_id = " & Carryto & " and d.day = 7 order by d.day, d.hour; "
        Dim dsDet As New DataSet
        Dim objDet As New genericcode
        dsDet = objDet.getDataset(strSql, _SQLWSUS)
        objDet = Nothing
        'END get all the detail rows for this date

        Dim strCol As String = ""

        For tc As Integer = 0 To dsDet.Tables.Count - 1
            Dim strClass As String = "bodyText"
            Dim Day As String = ""
            If dsDet.Tables(tc).Rows.Count > 0 Then
                Select Case dsDet.Tables(tc).Rows(0).Item("day")
                    Case 1
                        Day = "Sunday"
                    Case 2
                        Day = "Monday"
                    Case 3
                        Day = "Tuesday"
                    Case 4
                        Day = "Wednesday"
                    Case 5
                        Day = "Thursday"
                    Case 6
                        Day = "Friday"
                    Case 7
                        Day = "Saturday"
                End Select

                strRet &= "<table id='tbl" & tc & "' style='border: solid 1px Silver; width: 100%;background-color:" & strCol & "; '> "
                strRet &= "<tr class='bodyTextBold';'  id='tr" & dsDet.Tables(tc).Rows(0).Item("name") & "_" & Day & "'>"
                strRet &= "<td colspan=8>" & dsDet.Tables(tc).Rows(0).Item("name") & " - " & Day & "</td></TR>"

                strRet &= "<tr class='" & strClass & "';'  id='trHead" & dsDet.Tables(tc).Rows(0).Item("id") & "'>"
                strRet &= "<td><B>Delete</td>"
                strRet &= "<td><B>id</td>"
                strRet &= "<td><B>Time</td>"
                strRet &= "<td><B>Route ID</td>"
                strRet &= "<td><B>Carrier</td>"
                strRet &= "<td><B>Trailer Type</td>"
                strRet &= "<td><B>ASN</td>"
                strRet &= "<td><B>SCAC</td>"
                strRet &= "<td><B>Cutoff</td>"
                strRet &= "</tr>"


                For z1 As Integer = 0 To dsDet.Tables(tc).Rows.Count - 1
                    If z1 Mod 2 = 0 Then
                        strCol = "#BFBFBF"
                    Else
                        strCol = "#A4D3EE"
                    End If

                    Dim z As Integer = 0
                    Dim strId As String = ""
                    Dim strAsn As String = ""
                    Dim strCutoff As String = ""
                    Dim intDisp As Integer = 0

                    With dsDet.Tables(tc).Rows(z1)
                        strRet &= "<tr class= '" & strClass & "' id='tr" & dsDet.Tables(tc).Rows(z1).Item("id") & "'>"
                        strRet &= "<td>" & getDelButton(.Item("id"), 6, .Item("id"), "btnD" & .Item("id")) & "</td> "

                        If .Item("asn") = "1" Then
                            strAsn = "Yes"
                        Else
                            strAsn = "No"
                        End If

                        If .Item("cutoff") = "1" Then
                            strCutoff = "Yes"
                        Else
                            strCutoff = "No"
                        End If

                        strRet &= "<td>" & .Item("id") & "</td>"
                        strRet &= "<td>" & .Item("longtime") & "</td>"
                        strRet &= "<td>" & .Item("routeID") & "</td>"
                        strRet &= "<td>" & .Item("carrier") & "</td>"
                        strRet &= "<td>" & .Item("trailertype") & "</td>"
                        strRet &= "<td>" & strAsn & "</td>"
                        strRet &= "<td>" & .Item("scac") & "</td>"
                        strRet &= "<td>" & strCutoff & "</td>"

                        strRet &= "</tr>"
                    End With
                Next
            End If
            strRet &= "</TABLE>"
        Next

        Return strRet
    End Function


    <WebMethod()>
    Public Function DamagedTruckGrid(Datein As String) As String

        Dim strRet As String = "<table style='background-color:aqua;'><tr><td>No data found</td></tr></TABLE>"
        Dim strSql As String = "SELECT * FROM SmallProjects.dbo.damagedtruck WHERE closed IS NULL ORDER BY dtime DESC"

        Dim dsTemp As New DataSet
        Dim dsTemp2 As New DataSet
        Dim wsData As New general3.general3SoapClient("general3Soap")

        dsTemp = wsData.wsGetDataset(strSql, "SQL", "")

        If dsTemp.Tables(0).Rows.Count = 0 Then

        Else
            Dim Sel As String
            'strRet = "<table id='tblOut2' style='background-color:aqua;' class='bodyText'><thead><tr>" & _
            strRet = "<table id='tblOut1'><thead><tr>" &
                           "<th>Date Entered</th>" &
                           "<th>Employee ID</th>" &
                           "<th>Trailer ID</th>" &
                           "<th>Carrier</th>" &
                           "<th>Other Carrier</th>" &
                           "<th>Damage</th>" &
                           "<th>Other Damage</th>" &
                           "<th>Driver Notified</th>" &
                           "<th>Damaged By</th>" &
                           "<th>Comments</th>" &
                           "<th>Pictures</th>" &
                           "<th>Resolved</th>" &
                       "</tr></thead><tbody>"

            For x As Integer = 0 To dsTemp.Tables(0).Rows.Count - 1
                Dim currTrailer As String
                With dsTemp.Tables(0).Rows(x)
                    currTrailer = .Item("trailer")
                    strRet &= "<TR>"
                    strRet &= "<td>" & .Item("dtime") &
                        "</td><td>" & .Item("eid") &
                        "</td><td>" & .Item("trailer") &
                        "</td><td>" & .Item("carrier") &
                        "</td><td>" & .Item("otherCarrier") &
                        "</td><td>" & .Item("damage") &
                        "</td><td>" & .Item("otherDamage") &
                        "</td><td>" & .Item("notifiedDriver") &
                        "</td><td>" & .Item("damagedBy") &
                        "</td><td>" & .Item("comments") & "</td>"

                    Dim strSQL2 As String = "SELECT * FROM SmallProjects.dbo.damagedtruck_imgs WHERE dt_instance_id='" & .Item("id") & "'"
                    dsTemp2 = wsData.wsGetDataset(strSQL2, "SQL", "")

                    strRet &= "<td>"
                    For i As Integer = 0 To dsTemp2.Tables(0).Rows.Count - 1
                        With dsTemp2.Tables(0).Rows(i)
                            strRet &= "<a class='fancybox' href='./" & .Item("relative_fp") & "' rel='" & currTrailer & " " & .Item("dt_instance_id") & "'><img src='./" & .Item("relative_fp") & "' style='width:50px; heigth:50px; margin-left:5px;' alt='" & currTrailer & "' /></a>"
                        End With
                    Next
                    strRet &= "</td>"

                    If (IsDBNull(.Item("closed"))) Then
                        strRet &= "<td><input class='closedInput' type='checkbox'/></td>"
                    Else
                        strRet &= "<td><input class='closedInput' type='checkbox' disabled='disabled' checked />" & .Item("closedInput") & "</td>"
                    End If

                    strRet &= "</TR>"
                End With
            Next
            strRet &= "</tbody></table>"
        End If
        Return strRet
    End Function

    <WebMethod()>
    Public Function DamagedTruckGridFull(Datein As String) As String

        Dim strRet As String = "<table style='background-color:aqua;'><tr><td>No data found</td></tr></TABLE>"
        'Dim strSql As String = "SELECT * FROM SmallProjects.dbo.damagedrack WHERE date > DATEADD(dd, -" & Datein & ", GETDATE()) ORDER BY date DESC"
        Dim strSql As String = "SELECT * FROM SmallProjects.dbo.damagedtruck ORDER BY dtime DESC"
        Dim dsTemp As New DataSet
        Dim dsTemp2 As New DataSet

        Dim wsData As New general3.general3SoapClient("general3Soap")

        dsTemp = wsData.wsGetDataset(strSql, "SQL", "")

        If dsTemp.Tables(0).Rows.Count = 0 Then

        Else
            Dim Sel As String
            'strRet = "<table id='tblOut2' style='background-color:aqua;' class='bodyText'><thead><tr>" & _
            strRet = "<table id='tblOut1'><thead><tr>" &
                           "<th>Date Entered</th>" &
                           "<th>Employee ID</th>" &
                           "<th>Trailer ID</th>" &
                           "<th>Carrier</th>" &
                           "<th>Other Carrier</th>" &
                           "<th>Damage</th>" &
                           "<th>Other Damage</th>" &
                           "<th>Driver Notified</th>" &
                           "<th>Damaged By</th>" &
                           "<th>Comments</th>" &
                           "<th>Pictures</th>" &
                           "<th>Resolved</th>" &
                       "</tr></thead><tbody>"

            For x As Integer = 0 To dsTemp.Tables(0).Rows.Count - 1
                Dim currTrailer As String
                With dsTemp.Tables(0).Rows(x)
                    currTrailer = .Item("trailer")
                    strRet &= "<TR>"
                    strRet &= "<td>" & .Item("dtime") &
                        "</td><td>" & .Item("eid") &
                        "</td><td>" & .Item("trailer") &
                        "</td><td>" & .Item("carrier") &
                        "</td><td>" & .Item("otherCarrier") &
                        "</td><td>" & .Item("damage") &
                        "</td><td>" & .Item("otherDamage") &
                        "</td><td>" & .Item("notifiedDriver") &
                        "</td><td>" & .Item("damagedBy") &
                        "</td><td>" & .Item("comments") & "</td>"

                    Dim strSQL2 As String = "SELECT * FROM SmallProjects.dbo.damagedtruck_imgs WHERE dt_instance_id='" & .Item("id") & "'"
                    dsTemp2 = wsData.wsGetDataset(strSQL2, "SQL", "")

                    strRet &= "<td>"
                    For i As Integer = 0 To dsTemp2.Tables(0).Rows.Count - 1
                        With dsTemp2.Tables(0).Rows(i)
                            strRet &= "<a class='fancybox' href='./" & .Item("relative_fp") & "' rel='" & currTrailer & " " & .Item("dt_instance_id") & "'><img src='./" & .Item("relative_fp") & "' style='width:50px; heigth:50px; margin-left:5px;' alt='" & currTrailer & "' /></a>"
                        End With
                    Next
                    strRet &= "</td>"

                    If (IsDBNull(.Item("closed"))) Then
                        strRet &= "<td><input class='closedInput' type='checkbox'/></td>"
                    Else
                        strRet &= "<td><input class='unresolveInput' type='checkbox' checked />" & .Item("closed") & "</td>"
                    End If

                    strRet &= "</TR>"
                End With
            Next
            strRet &= "</tbody></table>"
        End If
        Return strRet
    End Function

    <WebMethod()>
    Public Sub AddNewTruck()
        Dim msg As String = ""
        Dim ID As Integer
        Dim wsData As New general3.general3SoapClient("general3Soap")
        Dim SQL As String = "INSERT INTO SmallProjects.dbo.damagedtruck (eid,dtime,trailer,carrier,otherCarrier,notifiedDriver,damage,otherDamage,damagedBy,comments) VALUES (@EID,@dt,@trailer,@carrier,@otherCarrier,@notifiedDriver,@damage,@otherDamage,@damagedBy,@comments)" &
                "Select Scope_Identity()"

        Dim connect As String = "Server=norplassql;Database=SmallProjects;User Id=sa_pass;Password=apassword;"

        Dim fc As HttpFileCollection = HttpContext.Current.Request.Files
        HttpContext.Current.Response.StatusCode = 200

        Try
            Using conn As New SqlConnection(connect)
                Using cmd As New SqlCommand(SQL, conn)
                    cmd.Parameters.Add("@EID", SqlDbType.Int).Value = HttpContext.Current.Request.Form("employeeID")
                    cmd.Parameters.Add("@dt", SqlDbType.DateTime).Value = HttpContext.Current.Request.Form("date")
                    cmd.Parameters.Add("@trailer", SqlDbType.VarChar).Value = HttpContext.Current.Request.Form("trailer")
                    cmd.Parameters.Add("@carrier", SqlDbType.VarChar).Value = HttpContext.Current.Request.Form("carrier")
                    cmd.Parameters.Add("@otherCarrier", SqlDbType.VarChar).Value = HttpContext.Current.Request.Form("otherCarrier")
                    cmd.Parameters.Add("@notifiedDriver", SqlDbType.VarChar).Value = HttpContext.Current.Request.Form("driverNotified")
                    cmd.Parameters.Add("@damage", SqlDbType.VarChar).Value = HttpContext.Current.Request.Form("damage")
                    cmd.Parameters.Add("@otherDamage", SqlDbType.VarChar).Value = HttpContext.Current.Request.Form("otherDamage")
                    cmd.Parameters.Add("@damagedBy", SqlDbType.VarChar).Value = HttpContext.Current.Request.Form("damagedBy")
                    cmd.Parameters.Add("@comments", SqlDbType.VarChar).Value = HttpContext.Current.Request.Form("comm")

                    conn.Open()
                    ID = cmd.ExecuteScalar()
                End Using
            End Using

            For i As Integer = 0 To fc.Count - 1
                Dim file As HttpPostedFile = fc(i)
                Dim fileName As String = SaveFile(file)
                Dim SQL2 As String = "INSERT INTO SmallProjects.dbo.damagedtruck_imgs (dt_instance_id, relative_fp) VALUES (@IID,@rel)"
                Dim filePath As String = "./uploads/damagedtruck/" & fileName

                Using conn2 As New SqlConnection(connect)
                    Using cmd2 As New SqlCommand(SQL2, conn2)
                        cmd2.Parameters.Add("@IID", SqlDbType.Int).Value = ID
                        cmd2.Parameters.Add("@rel", SqlDbType.VarChar).Value = filePath

                        conn2.Open()
                        cmd2.ExecuteScalar()
                    End Using
                End Using
            Next

        Catch ex As Exception

            HttpContext.Current.Response.StatusCode = 500
            msg = ex.ToString()
        End Try

        If msg.Length = 0 Then

            If (ID > 0) Then
                msg = "row added"
                'SQL = "EXEC [SmallProjects].[dbo].[sp_Email_damagedrack_queue]"
                'wsData.wsGenericSqlExec(SQL, "SQL", "")
            Else
                msg = "error adding row"
            End If
            HttpContext.Current.Response.StatusCode = 200
        End If



        Dim jsonMsg = "{""d"":""" & msg & """}"
        Dim ser As New JavaScriptSerializer()


        HttpContext.Current.Response.ContentType = "application/json; charset=utf-8"
        HttpContext.Current.Response.Write(ser.Serialize(jsonMsg))
    End Sub

    <WebMethod()>
    Public Function DamagedTruckGridUpdate(dateEntered As String, trailerId As String, status As String) As String
        Dim wsData As New general3.general3SoapClient("general3Soap")
        Dim strRet As String


        If status = "resolved" Then
            Dim SQL As String = "UPDATE SmallProjects.dbo.damagedtruck SET closed=GETDATE() WHERE trailer='" & trailerId & "' AND dtime='" & dateEntered & "'"

            Dim intRows As Integer = wsData.wsGenericSqlExec(SQL, "SQL", "")

            strRet = If(intRows = 1, "row added", "Error adding row")
        Else
            If status = "unresolved" Then
                Dim SQL As String = "UPDATE SmallProjects.dbo.damagedtruck SET closed=NULL WHERE trailer='" & trailerId & "' AND dtime='" & dateEntered & "'"

                Dim intRows As Integer = wsData.wsGenericSqlExec(SQL, "SQL", "")

                strRet = If(intRows = 1, "row added", "Error adding row")
            End If
        End If


        Return strRet
    End Function

    Function SaveFile(ByVal file As HttpPostedFile) As String

        ' Specify the path to save the uploaded file to.
        Dim savePath As String = "c:\wwwroot\Shipping2\uploads\damagedtruck\"

        ' Get the name of the file to upload.
        Dim fileName As String = file.FileName

        ' Create the path and file name to check for duplicates.
        Dim pathToCheck As String = savePath + fileName

        ' Create a temporary file name to use for checking duplicates.
        Dim tempfileName As String = ""

        ' Check to see if a file already exists with the
        ' same name as the file to upload.        
        If (System.IO.File.Exists(pathToCheck)) Then
            Dim counter As Integer = 2
            While (System.IO.File.Exists(pathToCheck))
                ' If a file with this name already exists,
                ' prefix the filename with a number.
                tempfileName = counter.ToString() + fileName
                pathToCheck = savePath + tempfileName
                counter = counter + 1
            End While

            fileName = tempfileName

        Else

        End If

        ' Append the name of the file to upload to the path.
        savePath += fileName

        ' Call the SaveAs method to save the uploaded
        ' file to the specified directory.
        file.SaveAs(savePath)

        Return fileName
    End Function

End Class