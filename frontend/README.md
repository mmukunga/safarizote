
#Git CheckIn Projects
git status
git add .
git commit -m "first commit"
#git commit --allow-empty -m "Purge cache"
git branch -M main
git push -u origin main


heroku logs --tail --app safarizote


cd .\frontend\
npm run start

./mvnw spring-boot:run "-Dspring-boot.run.profiles=dev" #Powershell
  mvnw spring-boot:run -Dspring-boot.run.profiles=dev   #CMD
