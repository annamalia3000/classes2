import { Character, Bowman, Swordsman, Magician, Daemon, Undead, Zombie } from '../func';

test.each([
    ['Маг', Bowman, 'Bowman', 100, 1, 25, 25],
    ['Leo', Swordsman, 'Swordsman', 100, 1, 40, 10],
    ['Rom', Magician, 'Magician', 100, 1, 10, 40],
    ['Vlad', Daemon, 'Daemon', 100, 1, 10, 40],
    ['Alex', Undead, 'Undead', 100, 1, 10, 4],
    ['Sacha', Zombie, 'Zombie', 100, 1, 40, 10],
])('should create a %s character', (name, CharacterClass, expectedType, expectedHealth = 100, expectedLevel = 1, expectedAttack, expectedDefence) => {
    const character = new CharacterClass(name);
    expect(character.name).toBe(name);
    expect(character.type).toBe(expectedType);
    expect(character.health).toBe(expectedHealth);
    expect(character.level).toBe(expectedLevel);
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
    const character = new Character('Hero', 'Swordsman', 80, 1, 100, 50);
    character.levelUp();

    expect(character.level).toBe(2);
    expect(character.attack).toBe(120); 
    expect(character.defence).toBe(60);
    expect(character.health).toBe(100);
});

test('levelUp should throw an error if character health is 0 or less', () => {
    const character = new Character('Hero', 'Swordsman', 0, 1, 100, 50);

    expect(() => character.levelUp()).toThrowError('Game over');
});

test('damage should reduce health correctly based on defence', () => {
    const character = new Character('Hero', 'Swordsman', 100, 1, 100, 50);
    character.damage(40);

    expect(character.health).toBe(80);
});

test('damage should not reduce health below 0', () => {
    const character = new Character('Hero', 'Swordsman', 10, 1, 100, 50);
    character.damage(40);

    expect(character.health).toBeLessThanOrEqual(0); 
});

test('damage should not change health if it is already 0 or less', () => {
    const character = new Character('Hero', 'Swordsman', 0, 1, 100, 50);
    character.damage(40);

    expect(character.health).toBe(0);
});