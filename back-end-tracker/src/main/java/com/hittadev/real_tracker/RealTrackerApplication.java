package com.hittadev.real_tracker;

import com.hittadev.real_tracker.models.Category;
import com.hittadev.real_tracker.models.Habit;
import com.hittadev.real_tracker.models.User;
import com.hittadev.real_tracker.repositories.CategoryRepository;
import com.hittadev.real_tracker.repositories.HabitRepository;
import com.hittadev.real_tracker.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RealTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(RealTrackerApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			UserRepository userRepository, CategoryRepository categoryRepository, HabitRepository habitRepository
	) {
		return args -> {
			var user = User.builder()
					.name("hittaLautaro")
					.password("1234")
					.email("hitta.lautaro@gmail.com")
					.build();
			userRepository.save(user);
			System.out.println("User created: " + user);

			var category = Category.builder()
					.name("Fitness")
					.user(user)
					.build();
			categoryRepository.save(category);
			System.out.println("Category created: " + category);

			var habit = Habit.builder()
					.name("Running")
					.user(user)
					.category(category)
					.build();
			habitRepository.save(habit);
		};
	}
}
