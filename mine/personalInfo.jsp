<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String nowLogin = session.getAttribute("nowLogin");
%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
    <title>我的-信息维护</title>
    <link rel="stylesheet" type="text/css" href="../css/api.css"/>
    <link rel="stylesheet" type="text/css" href="../css/aui.css"/>
    <link rel="stylesheet" type="text/css" href="../css/style.css"/>
    <script type="text/javascript" src="../script/api.js"></script>
    <script type="text/javascript" src="../script/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="../script/aui-dialog.js" ></script>
    <script type="text/javascript" src="../script/bizjs/personalInfo.js"></script>
	</head>

	<body>
	</body>
</html>
