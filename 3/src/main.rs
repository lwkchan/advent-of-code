use std::fs;

const TREE: char = '#';

fn main() {
    // Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
    let file_name = "src/input.txt";

    let file_data = fs::read_to_string(file_name).unwrap();

    // where each line looks like "..#..#......###.#...#......#..#"
    let lines: Vec<&str> = file_data.lines().collect();

    let answer = find_answer_1(lines);

    println!("You encountered {} trees", answer)
}

fn find_answer_1(lines: Vec<&str>) -> i32 {
    let mut result = 0;

    for (current_line_index, line) in lines.iter().enumerate() {
        // for each line, position to check will be 3n, where n is current_line_index
        let mut position_to_check = 3 * current_line_index; // 0-indexed

        // subtract line length from position to check to simulate the repetition of the map to the right
        while position_to_check > line.len() - 1 {
            position_to_check = position_to_check - line.len();
        }

        let character_to_check = line.chars().nth(position_to_check).unwrap();

        if character_to_check == TREE {
            result += 1;
        }
    }

    result
}
