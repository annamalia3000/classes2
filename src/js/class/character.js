export class Character {
    constructor(name, type) {
        const types = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];

        if (!types.includes(type)) {
            throw new Error('Wrong type');
        };

        if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
            throw new Error('Name must be a string with a length between 2 and 10 characters');
        }

        this.name = name;
        this.type= type;

        this.health = 100;
        this.level = 1;

        this.attack = undefined;
        this.defence = undefined;
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