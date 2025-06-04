// ==UserScript==
// @name         Venge.io HACKS 1.0.27 UNLIMTIED AMMO INF JUMP AUTO KILL TELEPORT AIMBOT ESP TIMESCALE
// @version      1.2
// @description  Venge.io HACKS
// @author       MetaHuman, MetaRobotHacks
// @match        https://venge.io/
// @grant        none
// @run-at       document-start
// @namespace    https://greasyfork.org/users/662462
// ==/UserScript==

var Hack = function() {
    // Configurações iniciais dos hacks (ativado/desativado e valores)
    this.settings = {
        infAmmo: false,     // Munição infinita
        infJump: false,     // Pulo infinito
        autoKill: false,    // Mata inimigos automaticamente ao nascerem
        speedMlt: 0,        // Multiplicador de velocidade (0 a 4)
        esp: true,          // Mostra inimigos através das paredes
        aimbot: false,      // Mira automática
        timeScale: 0,       // Escala de tempo (0 a 4)
        infHealth: false    // [NOVO] Vida infinita
    };

    // Objetos pra armazenar as funções "enganchadas" do jogo
    this.hooks = {
        network: null,
        movement: null,
        anticheat: null
    };

    // Função pra esperar que uma propriedade do jogo exista antes de mexer nela
    this.waitForProp = async function(val) {
        while (!window.hasOwnProperty(val)) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    };

    // Configura os "hooks" pra mexer nas funções do jogo
    this.setupHooks = function() {
        this.waitForProp("Movement").then(this.hookMovement).catch(e => console.log(e));
        this.waitForProp("NetworkManager").then(this.hookNetwork).catch(e => console.log(e));
        this.waitForProp("VengeGuard").then(this.hookAnticheat).catch(e => console.log(e));
        this.waitForProp("Label").then(this.hookLabel).catch(e => console.log(e));
    };

    // Configura as teclas pra ativar/desativar os hacks
    this.setupBinds = function() {
        window.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 190: // Ponto (.) - Auto-kill
                    this.settings.autoKill = !this.settings.autoKill;
                    this.hooks.network.app.fire("Chat:Message", "Hacks", "Kill on Respawn - " + (this.settings.autoKill ? "Enabled" : "Disabled"), !0);
                    break;
                case 188: // Vírgula (,) - Munição infinita
                    this.settings.infAmmo = !this.settings.infAmmo;
                    this.hooks.network.app.fire("Chat:Message", "Hacks", "Infinite Ammo - " + (this.settings.infAmmo ? "Enabled" : "Disabled"), !0);
                    break;
                case 186: // Ponto e vírgula (;) - Aimbot
                    this.settings.aimbot = !this.settings.aimbot;
                    this.hooks.network.app.fire("Chat:Message", "Hacks", "Aimbot - " + (this.settings.aimbot ? "Enabled" : "Disabled"), !0);
                    break;
                case 222: // Aspas ('') - Pulo infinito
                    this.settings.infJump = !this.settings.infJump;
                    this.hooks.network.app.fire("Chat:Message", "Hacks", "Infinite Jump - " + (this.settings.infJump ? "Enabled" : "Disabled"), !0);
                    break;
                case 191: // Barra (/) - Multiplicador de velocidade
                    this.settings.speedMlt++;
                    if (this.settings.speedMlt > 4) this.settings.speedMlt = 0;
                    this.hooks.network.app.fire("Chat:Message", "Hacks", "Speed Multiplier - " + (this.settings.speedMlt + 1) + "x", !0);
                    break;
                case 219: // Colchete esquerdo ([) - Teleporte
                    this.hooks.network.app.fire("Chat:Message", "Hacks", "Teleporting you to Safety", !0);
                    this.hooks.movement.app.fire("Player:Respawn", !0);
                    break;
                case 221: // Colchete direito (]) - ESP
                    this.settings.esp = !this.settings.esp;
                    this.hooks.network.app.fire("Chat:Message", "Hacks", "ESP - " + (this.settings.esp ? "Enabled" : "Disabled"), !0);
                    break;
                case 220: // Barra invertida (\) - Escala de tempo
                    this.settings.timeScale++;
                    if (this.settings.timeScale > 4) this.settings.timeScale = 0;
                    pc.app.timeScale = (this.settings.timeScale + 1);
                    this.hooks.network.app.fire("Chat:Message", "Hacks", "Timescale - " + (this.settings.timeScale + 1) + "x", !0);
                    break;
                case 189: // [NOVO] Tecla menos (-) - Vida infinita
                    this.settings.infHealth = !this.settings.infHealth;
                    this.hooks.network.app.fire("Chat:Message", "Hacks", "Infinite Health - " + (this.settings.infHealth ? "Enabled" : "Disabled"), !0);
                    break;
                default:
                    return;
            }
        });
    };

    // Hook pra mexer no movimento (munição, pulo, velocidade e agora saúde)
    this.hookMovement = function() {
        const update = Movement.prototype.update;
        var defaultSpeeds = [];
        Movement.prototype.update = function(t) {
            if (!FakeGuard.hooks.movement) {
                FakeGuard.hooks.movement = this;
                defaultSpeeds = [this.defaultSpeed, this.strafingSpeed];
            }
            FakeGuard.onTick();
            update.apply(this, [t]);
            if (FakeGuard.settings.infAmmo) {
                this.setAmmoFull();
                this.isHitting = false;
            }
            if (FakeGuard.settings.infJump) {
                this.isLanded = true;
                this.bounceJumpTime = 0;
                this.isJumping = false;
            }
            // [NOVO] Vida infinita: mantém a saúde cheia
            if (FakeGuard.settings.infHealth) {
                if (this.entity && this.entity.script && this.entity.script.player) {
                    this.entity.script.player.health = 100; // Define a saúde como 100 (máximo)
                    this.entity.script.player.isDeath = false; // Impede o estado de morte
                }
            }
            this.defaultSpeed = defaultSpeeds[0] * (FakeGuard.settings.speedMlt + 1);
            this.strafingSpeed = defaultSpeeds[1] * (FakeGuard.settings.speedMlt + 1);
        };
        console.log("Movement Hooked");
    };

    // Hook pra mexer na rede (auto-kill e comunicação com o servidor)
    this.hookNetwork = function() {
        var manager = NetworkManager.prototype.initialize;
        NetworkManager.prototype.initialize = function() {
            if (!FakeGuard.hooks.network) {
                FakeGuard.hooks.network = this;
            }
            manager.call(this);
        };

        var ogRespawn = NetworkManager.prototype.respawn;
        NetworkManager.prototype.respawn = function(e) {
            ogRespawn.apply(this, [e]);
            if (e && e.length > 0 && FakeGuard.settings.autoKill) {
                var t = e[0], i = this.getPlayerById(t);
                if (i && t != this.playerid) {
                    var scope = this;
                    setTimeout(function() {
                        scope.send(["da", t, 100, 1, i.position.x, i.position.y, i.position.z]);
                    }, 3500);
                }
            }
        };
        console.log("Network Hooked");
    };

    // Hook pra burlar o anti-cheat
    this.hookAnticheat = function() {
        VengeGuard.prototype.onCheck = function() {
            this.app.fire("Network:Guard", 1);
        };
        console.log("Anticheat Hooked");
    };

    // Hook pra mexer nos rótulos (ESP)
    this.hookLabel = function() {
        Label.prototype.update = function(t) {
            if (!pc.isSpectator) {
                if (this.player.isDeath)
                    return this.labelEntity.enabled = !1, !1;
                if (Date.now() - this.player.lastDamage > 1800 && !FakeGuard.settings.esp)
                    return this.labelEntity.enabled = !1, !1;
            }
            var e = new pc.Vec3,
                i = this.currentCamera,
                a = this.app.graphicsDevice.maxPixelRatio,
                s = this.screenEntity.screen.scale,
                n = this.app.graphicsDevice;
            i.worldToScreen(this.headPoint.getPosition(), e),
                e.x *= a,
                e.y *= a,
                e.x > 0 && e.x < this.app.graphicsDevice.width && e.y > 0 && e.y < this.app.graphicsDevice.height && e.z > 0 ?
                (this.labelEntity.setLocalPosition(e.x / s, (n.height - e.y) / s, 0), this.labelEntity.enabled = !0) :
                this.labelEntity.enabled = !1;
        };
        console.log("Label Hooked");
    };

    // Função que roda a cada tick (controla o aimbot)
    this.onTick = function() {
        if (FakeGuard.settings.aimbot) {
            var closest;
            var rec;

            var players = FakeGuard.hooks.network.players;
            for (var i = 0; i < players.length; i++) {
                var target = players[i];
                var t = FakeGuard.hooks.movement.entity.getPosition();
                let calcDist = Math.sqrt((target.position.y - t.y) ** 2 + (target.position.x - t.x) ** 2 + (target.position.z - t.z) ** 2);
                if (calcDist < rec || !rec) {
                    closest = target;
                    rec = calcDist;
                }
            }

            FakeGuard.closestp = closest;
            let rayCastList = pc.app.systems.rigidbody.raycastAll(FakeGuard.hooks.movement.entity.getPosition(), FakeGuard.closestp.getPosition()).map(x => x.entity.tags._list.toString());
            let rayCastCheck = rayCastList.length === 1 && rayCastList[0] === "Player";
            if (closest && rayCastCheck) {
                t = FakeGuard.hooks.movement.entity.getPosition();
                e = Utils.lookAt(closest.position.x, closest.position.z, t.x, t.z);
                FakeGuard.hooks.movement.lookX = e * 57.29577951308232 + Math.random() / 10 - Math.random() / 10;
                FakeGuard.hooks.movement.lookY = -1 * (this.getXDire(closest.position.x, closest.position.y, closest.position.z, t.x, t.y + 0.9, t.z)) * 57.29577951308232;
                FakeGuard.hooks.movement.leftMouse = true;
                FakeGuard.hooks.movement.setShooting(FakeGuard.hooks.movement.lastDelta);
            } else {
                FakeGuard.hooks.movement.leftMouse = false;
            }
        }
    };

    // Funções auxiliares pra calcular distâncias e ângulos pro aimbot
    this.getD3D = function(a, b, c, d, e, f) {
        let g = a - d, h = b - e, i = c - f;
        return Math.sqrt(g * g + h * h + i * i);
    };

    this.getXDire = function(a, b, c, d, e, f) {
        let g = Math.abs(b - e), h = this.getD3D(a, b, c, d, e, f);
        return Math.asin(g / h) * (b > e ? -1 : 1);
    };

    // Inicia os hooks e as teclas
    this.setupHooks();
    this.setupBinds();
};

// Inicia o hack
FakeGuard = new(Hack)();
