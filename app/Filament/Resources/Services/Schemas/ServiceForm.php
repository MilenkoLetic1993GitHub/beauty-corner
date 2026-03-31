<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')
                ->required()
                ->maxLength(255)
                ->live(onBlur: true)
                ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

            TextInput::make('slug')
                ->required()
                ->maxLength(255)
                ->unique(ignoreRecord: true),

            Textarea::make('short_description')
                ->rows(3),

            Textarea::make('description')
                ->rows(6),

            TextInput::make('image')
                ->maxLength(255),

            TextInput::make('sort_order')
                ->numeric()
                ->default(0)
                ->required(),

            Toggle::make('is_active')
                ->default(true)
                ->required(),
        ]);
    }
}
