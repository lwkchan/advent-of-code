use std::fs;

const TARGET_SUM: i32 = 2020;

fn main() {
    let file_name = "src/input.txt";

    let file_data = fs::read_to_string(file_name).unwrap();

    let numbers: Vec<i32> = file_data
        .lines()
        .map(|s| s.parse().expect("parse error"))
        .collect();

    let sorted_numbers = {
        let mut clone = numbers.clone();
        clone.sort();
        clone
    };

    let answer1 = find_answer_1(sorted_numbers.clone());

    println!(
        "The answers for problem 1 are: {}, {}",
        answer1.1, answer1.0
    );
    println!("Their product is: {}", answer1.1 * answer1.0);

    let answer2 = find_answer_2(sorted_numbers.clone());

    println!(
        "The answers for problem 2 are: {}, {}, {}",
        answer2.0, answer2.1, answer2.2
    );
    println!("Their product is: {}", answer2.0 * answer2.1 * answer2.2);
}

fn find_answer_1(numbers: Vec<i32>) -> (i32, i32) {
    let sorted_numbers = {
        let mut clone = numbers.clone();
        clone.sort();
        clone
    };

    let mut first_value_index = 0;
    let mut second_value_index = sorted_numbers.len() - 1;

    while sorted_numbers[first_value_index] + sorted_numbers[second_value_index] != TARGET_SUM {
        let current_sum = sorted_numbers[first_value_index] + sorted_numbers[second_value_index];
        if current_sum > TARGET_SUM {
            second_value_index -= 1;
        } else if current_sum < TARGET_SUM {
            first_value_index += 1;
        }
    }

    return (
        sorted_numbers[first_value_index],
        sorted_numbers[second_value_index],
    );
}

fn find_answer_2(numbers: Vec<i32>) -> (i32, i32, i32) {
    let mut result = (1, 2, 3);

    for (i, _) in numbers.iter().take(numbers.len() - 2).enumerate() {
        let mut left = i + 1;
        let mut right = numbers.len() - 1;

        while left < right {
            let current_sum = numbers[i] + numbers[left] + numbers[right];
            if current_sum == TARGET_SUM {
                result = (numbers[i], numbers[left], numbers[right]);
                left += 1;
                right += 1;
            } else if current_sum < TARGET_SUM {
                left += 1
            } else if current_sum > TARGET_SUM {
                right -= 1
            }
        }
    }
    return result;
}
