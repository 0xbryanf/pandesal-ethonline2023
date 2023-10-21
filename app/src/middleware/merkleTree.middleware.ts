import { keccak256 } from 'ethereum-cryptography/keccak';
import { bytesToHex } from 'ethereum-cryptography/utils';

class MerkleTree {
    private leaves: any;
    private concat: any;
    
    constructor(leaves: any[]) {
        this.leaves = leaves.map(Buffer.from).map(keccak256);
        this.concat = (left: Buffer, right: Buffer) => keccak256(Buffer.concat([left, right]));
    }
    
    public getRoot(): string {
        return bytesToHex(this._getRoot(this.leaves));
    }
    
    public addLeaf(leafData: string): number {
        this.leaves.push(keccak256(Buffer.from(leafData)));
        return this.leaves.length - 1; // Return the index of the new leaf
    }
    
    public getProof(leafData: string, layer: Buffer[] = this.leaves, proof: any[] = [], index: number): any[] {
        if (layer.length === 1) {
            return proof;
        }
        
        const newLayer: Buffer[] = [];
        
        for (let i = 0; i < layer.length; i += 2) {
            const left = layer[i];
            const right = layer[i + 1];
            
            if (!right) {
                newLayer.push(left);
            } else {
                newLayer.push(this.concat(left, right));
                
                if (index === i || index === i + 1) {
                    let isLeft = !(index % 2);
                    proof.push({
                        data: isLeft ? bytesToHex(right) : bytesToHex(left),
                        left: !isLeft,
                    });
                }
            }
        }
        
        return this.getProof(
            leafData,
            newLayer,
            proof,
            Math.floor(index / 2)
        );
    }
    
    private _getRoot(leaves: Buffer[] = this.leaves): Buffer {
        if (leaves.length === 1) {
            return leaves[0];
        }
        
        const layer: Buffer[] = [];
        for (let i = 0; i < leaves.length; i += 2) {
            const left = leaves[i];
            const right = leaves[i + 1];
            
            if (right) {
                layer.push(this.concat(left, right));
            } else {
                layer.push(left);
            }
        }
        
        return this._getRoot(layer);
    }
}

export default MerkleTree;