/**
 * @param qiniu {Object} qiniu模块实例
 * @return {Function} 执行方法
 */
module.exports = function (qiniu) {
    /**
     * @param {String} key 需要移动文件的文件名
     * @param {String} dstbucket 目标空间名
     * @return {String} dstkey 目标文件名
     * @return {Function} callback 成功回调
     * @return {Function} fail 失败回调
     */
    return function (key, dstbucket, dstkey, callback, fail) {
        var qiniu_conf = qiniu.qiniu_conf || {};

        // Access Key 和 Secret Key
        qiniu.conf.ACCESS_KEY = qiniu_conf.ACCESS_KEY;
        qiniu.conf.SECRET_KEY = qiniu_conf.SECRET_KEY;

        // 空间名
        var bucket = qiniu_conf.BUCKET_NAME;

        // 构建client对象
        var client = new qiniu.rs.Client();

        // 移动资源
        client.move(bucket, key, dstbucket, dstkey, function(err, ret) {
            if (!err) {
                // 移动成功， 处理返回值
                if ('function' === typeof callback) {
                    callback(ret);
                }
            } else {
                // 移动失败， 处理返回代码
                if ('function' === typeof fail) {
                    fail(err);
                }
            }
        });
    }
};
