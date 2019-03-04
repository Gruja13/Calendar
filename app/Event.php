<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public $timestamps = false;

    public $fillable = ['title', 'description', 'date'];
}
