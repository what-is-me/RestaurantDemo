package org.database.restaurant.controller;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.database.restaurant.bean.Picture;
import org.database.restaurant.mapper.PictureMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Api(tags = "图片")
@RestController
@RequestMapping("files")
@Slf4j
public class ImageController {
    @Value("${file.path}")
    String filePath;
    @Autowired
    PictureMapper pictureMapper;

    @PreAuthorize("hasAnyAuthority('waiter','cashier','chef','senior','admin')")
    @PostMapping("/upload")
    public Boolean upload(@RequestPart("files") MultipartFile[] files) {
        for (MultipartFile multipartFile : files) {
            String fileName = multipartFile.getOriginalFilename();  // 文件名
            File dest = new File(filePath + fileName);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            try {
                multipartFile.transferTo(dest);
                assert fileName != null;
                pictureMapper.insert(new Picture(fileName, "files/download?filename=" + fileName));
            } catch (Exception e) {
                log.error(e.getMessage());
                return false;
            }
        }
        return true;
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void download(HttpServletResponse response, @RequestParam("filename") String fileName) throws IOException {
        fileName = java.net.URLDecoder.decode(fileName, "UTF-8");
        File file = new File(filePath + fileName);
        if (!file.exists()) {
            return;
            //return "下载文件不存在";
        }
        response.reset();
        String fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
        switch (fileType) {
            case "png":
                response.setContentType("image/png");
                break;
            case "gif":
                response.setContentType("image/gif");
                break;
            default:
                response.setContentType("image/jpeg");
        }
        //response.setCharacterEncoding("utf-8");
        //response.setContentLength((int) file.length());
        //response.setHeader("Content-Disposition", "attachment;filename=" + java.net.URLEncoder.encode(fileName, "UTF-8"));
        try (BufferedInputStream bis = new BufferedInputStream(Files.newInputStream(file.toPath()))) {
            byte[] buff = new byte[100005];
            OutputStream os = response.getOutputStream();
            int i;
            while ((i = bis.read(buff)) != -1) {
                os.write(buff, 0, i);
                os.flush();
            }
        } catch (IOException e) {
            //return "下载失败";
        }
        //return "下载成功";
    }

    @GetMapping("/")
    public List<Picture> listAll() {
        return pictureMapper.listAll();
    }

    @PostMapping("/delete")
    public Boolean delete(@RequestParam String filename) {
        try {
            pictureMapper.delete(filename);
        } catch (Exception e) {
            return false;
        }
        try {
            Files.deleteIfExists(Paths.get(filePath + filename));
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return true;
    }
}
