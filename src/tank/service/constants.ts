
export const compressors = [{ power: 0, volume: 0 }, { power: 1, volume: 20 }, { power: 2, volume: 50 }];
export const filters = {
    volume: [0, 20, 50],
    type: [
        'none',
        'Canister filters',
        'Diatom filters',
        'Trickle filters',
        'Algae filters',
        'Baffle filters',
        'Fluidized bed filter',
        'Airlift filters',
        'Undergravel filters'
    ]
};

export const colors = ['none', 'neutral', 'warm', 'rgb', 'cold', 'grow'];