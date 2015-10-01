package ru.tonyware.pump;

/**
 * Created by Anton Rudenko on 28.09.15.
 */
public class Log {

    private String name;
    private String path;

    public Log() {
    }

    public Log(String name, String path) {
        this.name = name;
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Log{" +
                "name='" + name + '\'' +
                ", path='" + path + '\'' +
                '}';
    }
}
