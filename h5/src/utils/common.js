//上传文件插件的回调函数
export function uploadCallback(myApp,callback) {
    return function (file, response) {
        //登录超时，退出登录
        if (response.code === -10 || response.code === -11) {
            myApp.$data.isLogin = false;
            if (response.code === -11) {
                myApp.$message({ message: '强制下线，原因：当前登录用户在其它地方登录。', type: 'warning' });
            }
        }
            //用户无权限，无法操作，但需要后续处理
        else if (response.code === -9) {
            myApp.$message({ message: '当前用户组无操作权限！', type: 'warning' });
            callback(file, response);
        }
            //用户无权限，无法操作
        else if (response.code === -8) {
            myApp.$message({ message: '当前用户组无操作权限！', type: 'warning' });
        }
            //常规错误，
        else if (response.code === -1) {
            myApp.$message({ message: response.msg, type: 'error' });
            callback(file, response);
        }
            //成功
        else if (response.code === 0) {
            if (response.msg != null && response.msg != '') {
                myApp.$message({ message: response.msg, type: 'success' });
            }
            callback(file, response);
        }
    }
};

/**
 * 根据附件的扩展名判断使用哪一种图片
 * @param ext  附件的mime类型
 */
export function typeImgByMime(ext) {
    var basePath = '/images/256x256/';
    ext = ext.toLowerCase();
    if (ext === 'png') {
        basePath += "png-256.png";
    } else if (ext === 'ini') {
        basePath += "ini-256.png";
    } else if (ext === 'accdb') {
        basePath += "accdb-256.png";
    } else if (ext === 'avi') {
        basePath += 'avi-256.png';
    } else if (ext === 'bmp') {
        basePath += 'bmp-256.png';
    } else if (ext === 'css') {
        basePath += 'css-256.png';
    } else if (ext === 'docx') {
        basePath += 'docx-256.png';
    } else if (ext === 'eml') {
        basePath += 'eml-256.png';
    } else if (ext === 'eps') {
        basePath += 'eps-256.png';
    } else if (ext === 'fla') {
        basePath += 'fla-256.png';
    } else if (ext === 'gif') {
        basePath += 'gif-256.png';
    } else if (ext === 'html' || ext === 'htm') {
        basePath += 'html-256.png';
    } else if (ext === 'ind') {
        basePath += 'ind-256.png';
    } else if (ext === 'jpeg' || ext === 'jpg') {
        basePath += 'jpeg-256.png';
    } else if (ext === 'jsf') {
        basePath += 'jsf-256.png';
    } else if (ext === 'mdi') {
        basePath += 'mdi-256.png';
    } else if (ext === 'mov') {
        basePath += 'mov-256.png';
    } else if (ext === 'mp3') {
        basePath += 'mp3-256.png';
    } else if (ext === 'mpeg') {
        basePath += 'mpeg-256.png';
    } else if (ext === 'pdf') {
        basePath += 'pdf-256.png';
    } else if (ext === 'pptx' || ext === 'ppt') {
        basePath += 'pptx-256.png';
    } else if (ext === 'proj') {
        basePath += 'proj-256.png';
    } else if (ext === 'psd') {
        basePath += 'psd-256.png';
    } else if (ext === 'pst') {
        basePath += 'pst-256.png';
    } else if (ext === 'pub') {
        basePath += 'pub-256.png';
    } else if (ext === 'rar') {
        basePath += 'rar-256.png';
    } else if (ext === 'read') {
        basePath += 'read-256.png';
    } else if (ext === 'set') {
        basePath += 'set-256.png';
    } else if (ext === 'tiff') {
        basePath += 'tiff-256.png';
    } else if (ext === 'txt') {
        basePath += 'txt-256.png';
    } else if (ext === 'url') {
        basePath += 'url-256.png';
    } else if (ext === 'vsd') {
        basePath += 'vsd-256.png';
    } else if (ext === 'wav') {
        basePath += 'wav-256.png';
    } else if (ext === 'wma') {
        basePath += 'wma-256.png';
    } else if (ext === 'wmv') {
        basePath += 'wmv-256.png';
    } else if (ext === 'xlsx' || ext === 'xls') {
        basePath += 'xlsx-256.png';
    } else if (ext === 'zip') {
        basePath += 'zip-256.png';
    } else {
        basePath += 'ini-256.png';
    }
    return basePath;
}