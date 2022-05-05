AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {           

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");
            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            enemyBullet.setAttribute("class","fireball")
            enemyBullet.setAttribute("gltf-model", "./models/fireball/scene.gltf");
            enemyBullet.setAttribute("scale","0.009 0.009 0.009")
            

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x ,
                y: position.y + 3,
                z: position.z + 4,
            });

            
            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);


            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            //shooting direction
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            //set the velocity and it's direction
            var direction = new THREE.Vector3();

            direction.subVectors(position1, position2).normalize();

            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));

          
            

            var element = document.querySelector("#countLife");``
        var playerLife = parseInt(element.getAttribute("text").value);
        console.log(playerLife)

        //collide event on enemy bullets
        enemyBullet.addEventListener("collide", function (e) {
            console.log(e.detail.body.el.id)

            
            if (e.detail.body.el.id === "wall") { 
                console.log("please")           
                if (playerLife > 0) {
                    playerLife -= 1;
                    element.setAttribute("text", {
                        value: playerLife
                    });
                }
                if (playerLife <= 0) {
                    //show text
                    var txt = document.querySelector("#over");
                    txt.setAttribute("visible", true);

                    //remove monsters
                    var El = document.querySelector("#enemy1")
                    var E2 = document.querySelector("#enemy2")

                    scene.removeChild(El)
                    scene.removeChild(E2)
                    

                }

            }
        });

    }
    },
    

});