package org.database.restaurant.tools;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.database.restaurant.bean.RUser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Arrays;

public class ControllerHelper {
    private static final Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
    private final HttpSession session;
    ;
    private final String key = "user";

    public ControllerHelper(HttpServletRequest req) {
        session = req.getSession();
    }

    public static String toJson(Object obj) {
        return gson.toJson(obj);
    }

    public RUser getUser() {
        RUser user = (RUser) session.getAttribute(key);
        if (user == null) {
            return new RUser();
        }
        return user;
    }

    public void setUser(RUser user) {
        session.setAttribute(key, user);
    }

    public boolean havePermission(Integer[] permissionKeys) {
        RUser user = getUser();
        return Arrays.asList(permissionKeys).contains(user.getType());
    }
}
