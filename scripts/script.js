const nextBtn = document.getElementById("nextBtn");
const userEmailInpt = document.getElementById("emailInpt");

const userForm = angular.module("userForm", []);

userForm.controller("userFormContr", ($scope, $http)=>{
    $scope.message = "";
    $scope.userIn = ()=>{
        if(!$scope.userEmail){
            $scope.message = "Please enter your email."
            alert("Please enter your email.")
        }else{
            $http({
                method: "POST",
                url: "http://localhost:3000/userin",
                data: {"email": $scope.userEmail},
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                $scope.message = "Please, wait for while."
                localStorage.setItem("myAccount", response.data.userId);
                window.location.href = "./explore.html"
                console.log(response);
            });
        }
        console.warn("form submitted");
    }
})
