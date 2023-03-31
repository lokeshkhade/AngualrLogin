var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"sidebar","component":"SidebarComponent","children":[{"path":"course","component":"CourseComponent","canActivate":["CourseGuard"]},{"path":"studentdetails","component":"StudentdetailsComponent","canActivate":["StudentGuard"]}]},{"path":"","redirectTo":"/login","pathMatch":"full"},{"path":"login","component":"LoginComponent"},{"path":"admin","loadChildren":"./admin/admin.module#AdminModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/admin/admin-routing.module.ts","module":"AdminRoutingModule","children":[{"path":"","component":"AdminComponent"},{"path":"dashboard","component":"DashboardComponent"}],"kind":"module"}],"module":"AdminModule"}]},{"path":"faculty","loadChildren":"./faculty/faculty.module#FacultyModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/faculty/faculty-routing.module.ts","module":"FacultyRoutingModule","children":[{"path":"","component":"FacultyComponent"}],"kind":"module"}],"module":"FacultyModule"}]}],"kind":"module"}]}