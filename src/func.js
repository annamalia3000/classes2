export class Character {
    constructor(name, type, health = 100, level = 1, attack, defence) {
        const types = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];

        if (!types.includes(type)) {
            throw new Error('Wrong type');
        };

        if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
            throw new Error('Name must be a string with a length between 2 and 10 characters');
        }

        this.name = name;
        this.type= type;
        this.health = health;
        this.level = level;
        this.attack = attack;
        this.defence = defence;
    }

    levelUp() {
        if (this.health <= 0) {
            throw new Error('Game over');
        }

        this.level++;
        this.attack *= 1.2;
        this.defence *= 1.2;
        this.health = 100;
    }

    damage(points) {
        if (this.health >= 0) {
            this.health -= points * (1 - this.defence / 100);
            if (this.health < 0) {
                this.health = 0;
            }
        }
        
    }
}

export class Bowman extends Character {
    constructor(name) {
        super(name, 'Bowman', 100, 1, 25, 25);
    }
}

export class Swordsman extends Character {
    constructor(name) {
        super(name, 'Swordsman', 100, 1, 40, 10);
    }
}

export class Magician extends Character {
    constructor(name) {
        super(name, 'Magician', 100, 1, 10, 40);
    }
}

export class Daemon extends Character {
    constructor(name) {
        super(name, 'Daemon', 100, 1, 10, 40);
    }
}

export class Undead extends Character {
    constructor(name) {
        super(name, 'Undead', 100, 1, 10, 4);
    }
}

export class Zombie extends Character {
    constructor(name) {
        super(name, 'Zombie', 100, 1, 40, 10);
    }
}