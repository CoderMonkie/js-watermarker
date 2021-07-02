cd example/dist
git init
git add -A
git commit -m deploy 
git remote add origin https://gitee.com/coder-monkey/watermarker.git
git pull
git push --force origin HEAD:watermarker-pages
