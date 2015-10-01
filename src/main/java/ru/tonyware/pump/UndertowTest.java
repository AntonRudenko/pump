package ru.tonyware.pump;

import io.undertow.Undertow;
import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;

/**
 * Created by Anton Rudenko on 23.09.15.
 */
public class UndertowTest {
    public static void main(final String[] args) {
        long before = Runtime.getRuntime().freeMemory();
        System.out.println(Runtime.getRuntime().freeMemory());
        System.out.println(Runtime.getRuntime().totalMemory());
        Undertow server = Undertow.builder()
                .addHttpListener(8080, "localhost")
                .setHandler(new HttpHandler() {
                    @Override
                    public void handleRequest(final HttpServerExchange exchange) throws Exception {
                        exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "text/plain");
                        exchange.getResponseSender().send("Hello World");
                    }
                }).build();
        server.start();
        System.out.println("------------------------------------");
        System.out.println(Runtime.getRuntime().freeMemory());
        System.out.println(Runtime.getRuntime().totalMemory());
        System.out.println((Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory())/1_000_000);
        System.out.println((before - Runtime.getRuntime().freeMemory())/1_000_000);
    }
}
