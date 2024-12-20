import * as fs from "fs";
import * as path from "path";

// 设定扫描的路径
const Scan_Dr = "doc";

// 递归遍历文件夹并生成侧边栏结构
function generateSidebar(directory: string, parentLink: string = ""): any[] {
  const items: any[] = [];

  // 读取目录下的文件和文件夹
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const fullPath = path.join(directory, file);

    // 排除 .obsidian 和 assets 文件夹
    if (file === ".obsidian" || file === "assets") {
      return;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 如果是文件夹，递归生成子目录
      const folderName = file;
      const subItems = generateSidebar(fullPath, `${parentLink}/${folderName}`);

      // 检查文件夹是否包含 index.md 文件
      const hasIndexMd = fs.existsSync(path.join(fullPath, "index.md"));

      // 如果文件夹包含 index.md 文件，生成链接
      if (hasIndexMd) {
        items.push({
          text: folderName, // 文件夹名
          link: `${parentLink}/${folderName}`, // 链接
          collapsed: true, // 默认折叠
          items: subItems, // 子目录项
        });
      } else {
        // 否则，只显示文件夹名，不生成链接
        items.push({
          text: folderName, // 文件夹名
          collapsed: true, // 默认折叠
          items: subItems, // 子目录项
        });
      }
    } else if (file.endsWith(".md") && file !== "index.md") {
      // 如果是 .md 文件，且不是 index.md，生成链接
      const fileName = path.basename(file, ".md"); // 去掉 .md 后缀
      const cleanName = fileName.replace(/_/g, " "); // 替换下划线为空格
      const link = `${parentLink}/${fileName}`;

      // 读取文件内容，提取第一个一级标题
      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        const firstHeadingMatch = content.match(/^# (.+)$/m); // 匹配文件中的第一个一级标题

        let text = cleanName; // 如果没有一级标题，则使用清理过的文件名作为 text
        if (firstHeadingMatch) {
          text = firstHeadingMatch[1]; // 使用匹配到的一级标题作为 text
        }

        items.push({
          text: text, // 使用一级标题作为 text
          link: link, // 生成的链接
        });
      } catch (error) {
        console.error(`读取文件失败: ${fullPath}`, error);
      }
    }
  });

  return items;
}

// 生成导航栏（nav）
function generateNav(directory: string): any[] {
  const navItems: any[] = [];

  // 获取所有顶级文件夹
  const topLevelFolders = fs.readdirSync(directory).filter((file) => {
    const fullPath = path.join(directory, file);
    return (
      fs.statSync(fullPath).isDirectory() &&
      fs.existsSync(path.join(fullPath, "index.md"))
    );
  });

  // 遍历每个顶级文件夹，生成导航栏项
  for (const folder of topLevelFolders) {
    const folderPath = path.join(directory, folder);
    const indexPath = path.join(folderPath, "index.md");

    try {
      const content = fs.readFileSync(indexPath, "utf-8");
      const match = content.match(/<!--导航栏(\d+)-->/); // 提取注释中的数字

      if (match) {
        const order = parseInt(match[1], 10);
        navItems.push({
          text: folder,
          link: `/${Scan_Dr}/${folder}`, // 链接包含 /doc
          order: order, // 为排序提供数字
        });
      } else {
        console.warn(`未找到导航栏注释: ${indexPath}`);
      }
    } catch (error) {
      console.error(`读取文件失败: ${indexPath}`, error);
    }
  }

  // 按照 order 数字进行排序
  return navItems.sort((a, b) => a.order - b.order);
}

// 生成 JSON 文件并保存
async function generateMetadataJson() {
  const docDirectory = path.join(__dirname, "..", Scan_Dr);
  const sidebar: any = {};
  const nav: any[] = generateNav(docDirectory);

  // 获取所有顶级文件夹，生成侧边栏
  const topLevelFolders = fs.readdirSync(docDirectory).filter((file) => {
    const fullPath = path.join(docDirectory, file);
    return (
      fs.statSync(fullPath).isDirectory() &&
      fs.existsSync(path.join(fullPath, "index.md"))
    );
  });

  // 为每个顶级文件夹生成侧边栏
  for (const folder of topLevelFolders) {
    const folderPath = path.join(docDirectory, folder);
    const folderItems = generateSidebar(folderPath, `/${Scan_Dr}/${folder}`);
    sidebar[`/${Scan_Dr}/${folder}/`] = [
      {
        text: folder, // 顶级文件夹名
        items: folderItems, // 该文件夹的子项
      },
    ];
  }

  // 输出完整的 JSON 数据
  const metadataJson = {
    sidebar,
    nav,
  };

  // 保存到 docsMetadata.json 文件
  const outputPath = path.join(
    __dirname,
    "..",
    ".vitepress",
    "docsMetadata.json"
  );

  try {
    await fs.promises.mkdir(path.join(__dirname, "..", ".vitepress"), {
      recursive: true,
    });
    await fs.promises.writeFile(
      outputPath,
      JSON.stringify(metadataJson, null, 2),
      "utf-8"
    );
    console.log("docsMetadata.json 文件已生成！");
  } catch (error) {
    console.error("写入 JSON 文件失败:", error);
  }
}

// 执行生成元数据的函数
generateMetadataJson();
