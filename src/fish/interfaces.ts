export interface fish {
    id: number,
    name: string,
    scientificName: string,
    category: string,
    image: string,
    placeholder: string,
}

export interface fishCategory {
    id: number,
    name: string,
}

export interface fishProfileData {
        "id": number,
        "family": string | null,
        "origin": string | null,
        "social": string | null,
        "flock": string | null,
        "tank_level": string | null,
        "min_tank_size_one": string | null,
        "min_tank_size_pair": string | null,
        "min_tank_size_next_one": string | null,
        "min_water_volume_one": string | null,
        "min_water_volume_pair": string | null,
        "min_water_volume_next_one": string | null,
        "diet": string | null,
        "breeding": string | null,
        "care": string | null,
        "ph_comfort_min": string | null,
        "ph_comfort_max": string | null,
        "ph_survive_min": string | null,
        "ph_survive_max": string | null,
        "water_hardness_comfort_min": string | null,
        "water_hardness_comfort_max": string | null,
        "water_hardness_survive_min": string | null,
        "water_hardness_survive_max": string | null,
        "temperature_comfort_min": string | null,
        "temperature_comfort_max": string | null,
        "temperature_survive_min": string | null,
        "temperature_survive_max": string | null,
        "aeration": string | null,
        "filtration": string | null,
        "illumination": string | null,
        "water_transparency": string | null,
        "shelters": string | null,
        "open_space": string | null,
        "natural_driftwood": string | null,
        "living_plants": string | null,
        "streams": string | null,
        "soil": string | null,
        "water_change": string | null,
        "lifespan": string | null,
        "male_average_length": string | null,
        "female_average_length": string | null,
        "fish_value": string | null,
        "description": string | null,
        "fish": number
}