-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.53 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.5.0.5220
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 wangke 的数据库结构
CREATE DATABASE IF NOT EXISTS `wangke` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `wangke`;

-- 导出  表 wangke.article 结构


-- 导出  表 wangke.class 结构
CREATE TABLE IF NOT EXISTS `class` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` char(50) NOT NULL COMMENT '分类名称',
  `pid` int(11) NOT NULL COMMENT '父类id',
  `img` varchar(200) NOT NULL COMMENT '图片',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COMMENT='图书分类';

-- 正在导出表  wangke.class 的数据：36 rows
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` (`cid`, `name`, `pid`, `img`) VALUES
	(1, '特色', 0, ''),
	(2, '图书', 0, ''),
	(3, '艺术收藏', 0, ''),
	(4, '文创周边', 0, ''),
	(5, '线装古籍', 1, 'https://res2.kongfz.com/mobile/images/cate/xianzhuang.png'),
	(6, '民国旧书', 1, 'https://res2.kongfz.com/mobile/images/cate/minguo.png'),
	(7, '名人墨迹', 1, 'https://res2.kongfz.com/mobile/images/cate/moji.png'),
	(8, '名人字画', 1, 'https://res2.kongfz.com/mobile/images/cate/zihua.png'),
	(9, '小说', 2, 'https://res2.kongfz.com/mobile/images/cate/xiaoshuo.png'),
	(10, '文学', 2, 'https://res2.kongfz.com/mobile/images/cate/wenxue.png'),
	(11, '语言文字', 2, 'https://res2.kongfz.com/mobile/images/cate/yuyan.png'),
	(12, '历史', 2, 'https://res2.kongfz.com/mobile/images/cate/lishi.png'),
	(13, '地理', 2, 'https://res2.kongfz.com/mobile/images/cate/dili.png'),
	(14, '艺术', 2, 'https://res2.kongfz.com/mobile/images/cate/yishu.png'),
	(15, '政治', 2, 'https://res2.kongfz.com/mobile/images/cate/zhengzhi.png'),
	(16, '法律', 2, 'https://res2.kongfz.com/mobile/images/cate/falv.png'),
	(17, '军事', 2, 'https://res2.kongfz.com/mobile/images/cate/junshi.png'),
	(18, '哲学心理学', 2, 'https://res2.kongfz.com/mobile/images/cate/zhexue.png'),
	(19, '宗教', 2, 'https://res2.kongfz.com/mobile/images/cate/zongjiao.png'),
	(20, '经济', 2, 'https://res2.kongfz.com/mobile/images/cate/jingji.png'),
	(21, '社会文化', 2, 'https://res2.kongfz.com/mobile/images/cate/shwh.png'),
	(22, '教育', 2, 'https://res2.kongfz.com/mobile/images/cate/jiaoyu.png'),
	(23, '古旧地图', 3, 'https://res2.kongfz.com/mobile/images/cate/ditu.png'),
	(24, '照片影像', 3, 'https://res2.kongfz.com/mobile/images/cate/zhaopian.png'),
	(25, '连环画', 3, 'https://res2.kongfz.com/mobile/images/cate/lianhuanhua.png'),
	(26, '版画宣传画', 3, 'https://res2.kongfz.com/mobile/images/cate/banhua.png'),
	(27, '邮票税票', 3, 'https://res2.kongfz.com/mobile/images/cate/youpiao.png'),
	(28, '钱币', 3, 'https://res2.kongfz.com/mobile/images/cate/qianbi.png'),
	(29, '文房雅玩', 3, 'https://res2.kongfz.com/mobile/images/cate/wfyw.png'),
	(30, '工艺品', 3, 'https://res2.kongfz.com/mobile/images/cate/gongyipin.png'),
	(31, '笔墨', 4, 'https://res2.kongfz.com/mobile/images/cate/bimo.png'),
	(32, '纸本', 4, 'https://res2.kongfz.com/mobile/images/cate/zhiben.png'),
	(33, '卡片', 4, 'https://res2.kongfz.com/mobile/images/cate/kapian.png'),
	(34, '日历', 4, 'https://res2.kongfz.com/mobile/images/cate/rili.png'),
	(35, '包装', 4, 'https://res2.kongfz.com/mobile/images/cate/baodai.png'),
	(36, '动漫影视周边', 4, 'https://res2.kongfz.com/mobile/images/cate/dongman.png');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;

