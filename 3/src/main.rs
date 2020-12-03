use std::fs;

const TREE: char = '#';

fn main() {
    let file_name = "src/input.txt";
    let file_data = fs::read_to_string(file_name).unwrap();
    // where each line looks like "..#..#......###.#...#......#..#"
    let lines: Vec<&str> = file_data.lines().collect();
    // Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
    let answer = find_answer_1(lines.clone());
    println!("You encountered {} trees", answer);
    let answer = find_answer_2(lines.clone());
    println!("You encountered {} trees", answer)
}

fn find_answer_1(lines: Vec<&str>) -> i64 {
    check_route_for_trees(lines, &(3 as i32), &(1 as i32))
}

fn find_answer_2(lines: Vec<&str>) -> i64 {
    let mut result = 1;

    const ROUTES: [(i32, i32); 5] = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)];

    for (right, down) in ROUTES.iter() {
        result *= check_route_for_trees(lines.clone(), right, down);
    }

    result
}

fn check_route_for_trees(
    lines_data: Vec<&str>,
    spaces_across_right: &i32,
    spaces_down: &i32,
) -> i64 {
    let mut result = 0;
    let mut position_to_check = 0;

    for (current_line_index, line) in lines_data.iter().enumerate() {
        if (current_line_index) % (*spaces_down as usize) != 0 {
            continue;
        }
        let character_to_check = line.chars().nth(position_to_check).unwrap();
        if character_to_check == TREE {
            result += 1;
        }

        position_to_check += *spaces_across_right as usize;

        // subtract the length of the line to simulate the line repetition to the right
        if position_to_check >= line.len() {
            position_to_check -= line.len();
        }
    }
    result
}
