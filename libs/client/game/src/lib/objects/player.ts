import * as Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Container {
    private playerName: string;
    private points: number;
    private text: Phaser.GameObjects.Text;
    
    constructor(scene: Phaser.Scene, name: string) {
        super(scene, 0, 0, []);

        scene.add.existing(this);

        this.playerName = name;
        this.points = 0;
    
        this.text = scene.add.text(0, 0, `${this.playerName}: ${this.points}`, {
        fontSize: '32px',
        color: '#fff',
        });
    
        this.add(this.text);
        
    }
    
    setPoints(points: number) {
        this.points += points;
        this.text.setText(`${this.playerName}: ${this.points}`);
    }
}
