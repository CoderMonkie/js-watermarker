cd example/dist
git init
git config user.name CoderMonkie
git config user.email maonianyou@gmail.com
git add -A
git commit -m deploy 
git remote add gitee https://gitee.com/coder-monkey/js-watermarker.git
git remote add github git@github.com:CoderMonkie/js-watermarker.git
git pull github
git pull gitee
git push --force github HEAD:watermark-pages
git push --force gitee HEAD:watermark-pages
