import { Character } from '../class/character.js';
import { Bowman } from '../class/bowman.js'
import { Swordsman } from '../class/swordsman.js';
import { Magician } from '../class/magician.js';
import { Daemon } from '../class/daemon.js';
import { Undead } from '../class/undead.js';
import { Zombie } from '../class/zombie.js';

test.each([
    ['Маг', Bowman, 'Bowman', 25, 25],
    ['Leo', Swordsman, 'Swordsman', 40, 10],
    ['Rom', Magician, 'Magician', 10, 40],
    ['Vlad', Daemon, 'Daemon', 10, 40],
    ['Alex', Undead, 'Undead', 25, 25],
    ['Sacha', Zombie, 'Zombie', 40, 10],
])('should create a %s character', (name, Class, expectedType, expectedAttack, expectedDefence) => {
    const character = new Class(name);
    expect(character.name).toBe(name);
    expect(character.type).toBe(expectedType);
    expect(character.health).toBe(100);
    expect(character.level).toBe(1);
    expect(character.attack).toBe(expectedAttack);
    expect(character.defence).toBe(expectedDefence);
});


test('should throw error for invalid type', () => {
    expect(() => new Character('John', 'Warrior', 100, 1, 20, 20)).toThrowError(
        'Wrong type'
    );
});

test('should throw error for invalid name length - too short', () => {
    expect(() => new Character('J', 'Bowman', 100, 1, 20, 20)).toThrowError(
        'Name must be a string with a length between 2 and 10 characters'
    );
});

test('should throw error for invalid name length - too long', () => {
    expect(() => new Character('Johnathonon', 'Bowman', 100, 1, 20, 20)).toThrowError(
        'Name must be a string with a length between 2 and 10 characters'
    );
});

test('should throw error for invalid name type', () => {
    expect(() => new Character(123, 'Bowman', 100, 1, 20, 20)).toThrowError(
        'Name must be a string with a length between 2 and 10 characters'
    );
});

test('should throw error if not all arguments are provided', () => {
    expect(() => new Character('Test')).toThrow();
});

test('levelUp should increase level by 1, increase attack and defence by 20%, and set health to 100', () => {
    const character = new Bowman('Hero');
    character.health = 80;
    character.attack = 100;
    character.defence = 50;
    character.levelUp();

    expect(character.level).toBe(2);
    expect(character.attack).toBe(120);
    expect(character.defence).toBe(60);
    expect(character.health).toBe(100);
});

test('levelUp should throw an error if character health is 0 or less', () => {
    const character = new Bowman('Hero');
    character.health = 0;
    character.attack = 100;
    character.defence = 50;

    expect(() => character.levelUp()).toThrowError('Game over');
});

test('damage should reduce health correctly based on defence', () => {
    const character = new Bowman('Hero');
    character.health = 100;
    character.attack = 100;
    character.defence = 50;
    character.damage(40);

    expect(character.health).toBe(80);
});

test('damage should not reduce health below 0', () => {
    const character = new Bowman('Hero');
    character.health = 10;
    character.attack = 100;
    character.defence = 50;
    character.damage(40);

    expect(character.health).toBe(0);
});

test('damage should not change health if it is already 0 or less', () => {
    const character = new Bowman('Hero');
    character.health = 0;
    character.attack = 100;
    character.defence = 50;
    character.damage(40);

    expect(character.health).toBe(0);
});

test('damage should not be applied if health is less 0', () => {
    const character = new Bowman('Hero');
    character.health = -40;
    character.attack = 100;
    character.defence = 50;
    character.damage(40);

    expect(character.health).toBe(-40);
    character.damage(50);
    expect(character.health).toBe(-40);
});