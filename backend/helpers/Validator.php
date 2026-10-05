<?php
/**
 * GoBabyGo Cabs - Input Validation & Sanitization Utility
 */

declare(strict_types=1);

class Validator {
    private array $errors = [];

    public function sanitize(string|null $value): string {
        if ($value === null) {
            return '';
        }
        return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
    }

    public function required(mixed $value, string $field, string $label = ''): self {
        $name = $label ?: ucfirst(str_replace('_', ' ', $field));
        if ($value === null || (is_string($value) && trim($value) === '') || (is_array($value) && empty($value))) {
            $this->errors[$field] = "{$name} is required.";
        }
        return $this;
    }

    public function email(mixed $value, string $field, string $label = ''): self {
        $name = $label ?: ucfirst(str_replace('_', ' ', $field));
        if (!empty($value) && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field] = "{$name} must be a valid email address.";
        }
        return $this;
    }

    public function phone(mixed $value, string $field, string $label = ''): self {
        $name = $label ?: ucfirst(str_replace('_', ' ', $field));
        if (!empty($value)) {
            // Strip spaces, dashes, parentheses, plus signs
            $clean = preg_replace('/[\s\-\(\)\+]/', '', (string)$value);
            // Minimum 10 digits for Indian and international numbers
            if (!preg_match('/^[0-9]{10,14}$/', $clean)) {
                $this->errors[$field] = "{$name} must be a valid phone number (at least 10 digits).";
            }
        }
        return $this;
    }

    public function minLength(mixed $value, int $min, string $field, string $label = ''): self {
        $name = $label ?: ucfirst(str_replace('_', ' ', $field));
        $len = is_string($value) ? (function_exists('mb_strlen') ? mb_strlen($value) : strlen($value)) : 0;
        if (!empty($value) && $len < $min) {
            $this->errors[$field] = "{$name} must be at least {$min} characters.";
        }
        return $this;
    }

    public function in(mixed $value, array $allowed, string $field, string $label = ''): self {
        $name = $label ?: ucfirst(str_replace('_', ' ', $field));
        if (!empty($value) && !in_array($value, $allowed, true)) {
            $allowedStr = implode(', ', $allowed);
            $this->errors[$field] = "{$name} must be one of: {$allowedStr}.";
        }
        return $this;
    }

    public function passes(): bool {
        return empty($this->errors);
    }

    public function fails(): bool {
        return !empty($this->errors);
    }

    public function getErrors(): array {
        return $this->errors;
    }

    public function getFirstError(): string {
        return !empty($this->errors) ? reset($this->errors) : '';
    }
}
