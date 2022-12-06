package org.database.restaurant.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.database.restaurant.bean.RUser;
import org.database.restaurant.mapper.RUserMapper;
import org.database.restaurant.tools.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@Api(tags = "用户管理")
@Slf4j
public class UserController {
    @Autowired
    RUserMapper rUserMapper;

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ApiOperation("通过用户名或者uid查询，密码是加密的（不可逆）")
    @ApiImplicitParam(name = "username", value = "用户名或者uid<br>留空则查询所有")
    public List<RUser> listAll(@RequestParam(value = "username", required = false) String uid) {
        if (uid == null)
            return rUserMapper.listAll();
        else return rUserMapper.find(uid);
    }

    @PreAuthorize("hasAuthority('admin')")
    @ApiOperation("新用户")
    @RequestMapping(value = "/insert", method = {RequestMethod.GET, RequestMethod.POST})
    public Boolean insert(@RequestParam String name,
                          @RequestParam String password,
                          @RequestParam String type) {
        password = PasswordEncoder.encoderPassword(password);
        try {
            rUserMapper.insert(RUser.builder().name(name).password(password).type(type).build());
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @ApiOperation("更新密码")
    @RequestMapping(value = "/update", method = {RequestMethod.GET, RequestMethod.POST})
    public Boolean updatePassword(@RequestParam String username, @RequestParam String password) {
        password = PasswordEncoder.encoderPassword(password);
        try {
            rUserMapper.updatePassword(username, password);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @ApiOperation("删除用户")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public Boolean delete(@RequestParam String username) {
        try {
            rUserMapper.delete(username);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @ApiOperation("调试用")
    @GetMapping("/getUsername")
    public Object getUsername() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
