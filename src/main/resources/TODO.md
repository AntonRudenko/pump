1. навести микрокрасоту
2. ~~Выводить список доступных логов и дать возможность их включать и выключать~~
3. Сделать сообщение от сервера более информативным, что пришло
4. ~~Научиться анализировать стек или не стек и сворачивать его~~
5. ~~Фильтры~~
6. ~~Выбор цвета лога~~
7. ~~Когда выбирается цвет лога перекрашивать старые сообщения~~
7. ~~Поправить светку/развертку, чтобы что-то менялось~~
8. ~~Починить скролл~~
9. Подгрузка файла

pumpLog java.lang.RuntimeException: Just test exception
pumpLog at ru.tonyware.pump.TestController.sendException(TestController.java:30)
pumpLog at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
pumpLog at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
pumpLog at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
pumpLog at java.lang.reflect.Method.invoke(Method.java:497)
pumpLog at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:221)
pumpLog at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:137)
pumpLog at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:110)
pumpLog at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandleMethod(RequestMappingHandlerAdapter.java:777)
pumpLog at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:706)
pumpLog at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:85)
pumpLog at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:943)
pumpLog at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:877)
pumpLog at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:966)
pumpLog at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:868)
pumpLog at javax.servlet.http.HttpServlet.service(HttpServlet.java:648)
pumpLog at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:842)
pumpLog at javax.servlet.http.HttpServlet.service(HttpServlet.java:729)
pumpLog at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:291)
pumpLog at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206)
pumpLog at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)
pumpLog at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:239)
pumpLog at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206)
pumpLog at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:88)
pumpLog at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)
pumpLog at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:239)
pumpLog at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206)
pumpLog at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:219)
pumpLog at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:106)
pumpLog at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:502)
pumpLog at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:142)
pumpLog at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:79)
pumpLog at org.apache.catalina.valves.AbstractAccessLogValve.invoke(AbstractAccessLogValve.java:616)
pumpLog at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:88)
pumpLog at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:518)
pumpLog at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1091)
pumpLog at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:673)
pumpLog at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1526)
pumpLog at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.run(NioEndpoint.java:1482)
pumpLog at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
pumpLog at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
pumpLog at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)
pumpLog at java.lang.Thread.run(Thread.java:745)